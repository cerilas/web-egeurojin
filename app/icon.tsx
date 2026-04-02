import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #1c1917 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            marginBottom: 2,
          }}
        >
          E
        </span>
      </div>
    ),
    { ...size },
  );
}
