import { ImageResponse } from "next/og";

export const alt = "MLSTVFF — Maulana Akbar Kusuma, UI/UX Designer";
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
          padding: "64px 72px",
          background: "linear-gradient(135deg, #f8f8f6 0%, #ffffff 55%, #eaf8ee 100%)",
          color: "#101010",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 700, letterSpacing: "-1px" }}>
          MLSTVFF <span style={{ color: "#24ed45", marginLeft: 8 }}>✳</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, letterSpacing: 3, color: "#666" }}>
            <span style={{ width: 10, height: 10, background: "#24ed45" }} /> PERSONAL PORTFOLIO
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: "-5px", fontWeight: 600, maxWidth: 1000 }}>
            Maulana Akbar Kusuma
          </div>
          <div style={{ fontSize: 32, color: "#656565" }}>UI/UX Designer · Indonesia</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#666" }}>
          <span>Designing clear, useful digital experiences.</span>
          <span>MLSTVFF</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
