"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VS = `
  attribute vec4 aVertexPosition;
  void main() { gl_Position = aVertexPosition; }
`;

/* Fragment shader — moving plasma lines (brand #074789) on neutral-50 (#f8fafc) background.
   Extracted from 21st.dev shader-background; colours adapted for FleetCare Connect. */
const FS = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed   = 0.1;
  const float gridSmoothWidth = 0.015;
  const float axisWidth       = 0.05;
  const float majorLineWidth  = 0.025;
  const float minorLineWidth  = 0.0125;
  const float scale           = 5.0;

  // Brand colour #074789 in normalised RGB
  const vec4 lineColor = vec4(0.027, 0.278, 0.537, 1.0);

  const float minLineWidth    = 0.005;
  const float maxLineWidth    = 0.12;
  const float lineSpeed       = 1.0 * overallSpeed;
  const float lineAmplitude   = 1.0;
  const float lineFrequency   = 0.2;
  const float warpSpeed       = 0.2 * overallSpeed;
  const float warpFrequency   = 0.5;
  const float warpAmplitude   = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed     = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int   linesPerGroup   = 10;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 uv    = gl_FragCoord.xy / iResolution.xy;
    vec2 space = (gl_FragCoord.xy - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade   = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    // Warp space for organic movement
    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    // Accumulate line intensities
    vec4 lines = vec4(0.0);
    for (int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime     = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand      = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset    = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex))
                        * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);

      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0
                 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2  circlePos = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePos, 0.01, space) * 4.0;

      lines += (line + circle) * lineColor * rand;
    }

    // Background: neutral-50 (#f8fafc)
    vec4  bg           = vec4(0.973, 0.980, 0.988, 1.0);
    float lineStrength = clamp(length(lines.rgb) * 0.8, 0.0, 1.0);

    gl_FragColor   = mix(bg, lineColor, lineStrength);
    gl_FragColor.a = 1.0;
  }
`;

interface ShaderBackgroundProps {
  className?: string;
}

export function ShaderBackground({ className }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // ── Compile helper ──
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // ── Full-screen quad ──
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aVertexPosition");
    const uRes = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");

    // ── Resize: match canvas pixel size to its CSS size ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Render loop ──
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let rafId: number;

    const render = () => {
      const t = prefersReducedMotion ? 0 : (performance.now() - start) / 1000;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!prefersReducedMotion) rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{
        maskImage: "linear-gradient(to left, black 0%, black 25%, transparent 75%)",
        WebkitMaskImage: "linear-gradient(to left, black 0%, black 25%, transparent 75%)",
      }}
      aria-hidden
    />
  );
}
