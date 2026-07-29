import { ImageResponse } from "next/og"

import { getBrandIconDataUri } from "@/lib/brand-icon"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon() {
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
          borderRadius: 7,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders its own <img>, not next/image */}
        <img src={iconSrc} width={24} height={24} alt="" />
      </div>
    ),
    { ...size }
  )
}
