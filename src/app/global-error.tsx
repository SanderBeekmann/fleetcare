"use client";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="nl">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#171717",
            }}
          >
            Er is iets misgegaan
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#525252" }}>
            Er is een onverwachte fout opgetreden. Probeer de pagina te vernieuwen.
          </p>
          <button
            onClick={reset}
            style={{
              backgroundColor: "#074789",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0.75rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Opnieuw proberen
          </button>
        </div>
      </body>
    </html>
  );
}
