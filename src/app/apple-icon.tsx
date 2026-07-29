import { ImageResponse } from "next/og"

import { getBrandIconDataUri } from "@/lib/brand-icon"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default async function AppleIcon() {
  const iconSrc = await getBrandIconDataUri()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders its own <img>, not next/image */}
        <img src={iconSrc} width={124} height={126} alt="" />
      </div>
    ),
    { ...size }
  )
}
