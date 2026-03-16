import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oplossingen | FleetCare Connect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#074789",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 700 }}>Oplossingen</div>
      <div style={{ fontSize: 28, marginTop: 16, opacity: 0.9 }}>FleetCare Connect</div>
    </div>,
    { ...size }
  );
}
