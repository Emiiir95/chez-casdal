import { ImageResponse } from "next/og";

/**
 * Image Open Graph générée à la volée.
 * Format 1200×630 — branding Chez Casdal (charbon + flamme).
 * URL : /api/og
 */

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
          color: "white",
          fontFamily: "sans-serif",
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,107,26,0.35), transparent 50%), radial-gradient(circle at 85% 70%, rgba(245,183,64,0.25), transparent 55%), #0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            padding: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 600,
              color: "#ff8336",
              marginBottom: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Fast-food · Saint-Ouen-l&apos;Aumône
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.0,
              maxWidth: 1040,
              letterSpacing: -1,
            }}
          >
            Chez Casdal
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              marginTop: 24,
              color: "rgba(255,250,243,0.92)",
            }}
          >
            Quand t&apos;as la dalle, pense Casdal !
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              marginTop: 28,
              color: "rgba(255,250,243,0.7)",
            }}
          >
            {baseUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=86400, stale-while-revalidate=604800, immutable",
      },
    },
  );
}
