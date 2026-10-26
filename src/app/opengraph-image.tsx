import { ImageResponse } from "next/og";

export const alt = "Ahene Fia Events & Conference Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10151B",
          color: "#F7F3EA",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 54,
              height: 54,
              border: "2px solid #D6AD60",
              transform: "rotate(45deg)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#D6AD60" }}>AHENE FIA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#D6AD60" }}>EVENTS & CONFERENCE HUB</div>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 0.95, maxWidth: 920 }}>Where Vision Meets Experience.</div>
          <div style={{ display: "flex", fontSize: 28, color: "#D9D4C8" }}>Accra · 16–17 October 2027 · Demonstration programme</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
