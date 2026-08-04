import { ImageResponse } from "next/og";

export const alt = "Vincent Low — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f1eadf",
          color: "#1f2a24",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ fontSize: 72, fontWeight: 600 }}>Vincent Low</div>
          <div style={{ fontSize: 34 }}>
            Product designer building clear, intuitive digital experiences.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
