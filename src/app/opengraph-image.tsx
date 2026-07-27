import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, #4F46E5 0%, transparent 42%), radial-gradient(circle at 88% 82%, #16A34A 0%, transparent 38%), linear-gradient(135deg, #1E1B4B 0%, #0B0B0C 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 700, maxWidth: 980, lineHeight: 1.15, letterSpacing: -1.5 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#C7C7CC", marginTop: 32, maxWidth: 820 }}>
          Google Ads, Meta Ads, conversion tracking, and AI-powered marketing systems built to
          compound revenue.
        </div>
      </div>
    ),
    { ...size }
  )
}
