import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { DatasetPobreza } from "../types/schema";

export const Bloque5_Bucaramanga: React.FC<{ data: DatasetPobreza }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada general
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Animación de barras basada en físicas
  const scaleY = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  // Extracción de datos del JSON inyectado
  const nacional = data.multidimensional_poverty_ipm.national.total;
  const bucaramanga_am = data.monetary_poverty.regional.bucaramanga_am.total.max;
  const santander_ipm = data.multidimensional_poverty_ipm.regional.santander.total;

  const barStyle = (value: number, color: string) => ({
    width: "120px",
    height: `${value * 10}px`, // Escalado para visualización
    backgroundColor: color,
    transform: `scaleY(${scaleY})`,
    transformOrigin: "bottom",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingTop: "20px",
    borderRadius: "8px 8px 0 0"
  });

  return (
    <div style={{ opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", color: "#c9d1d9", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: "60px", marginBottom: "20px", color: "#58a6ff" }}>
        Bloque 5: Telemetría Local ({data.multidimensional_poverty_ipm.year_reference})
      </h1>
      
      <div style={{ display: "flex", gap: "60px", alignItems: "flex-end", height: "400px", borderBottom: "4px solid #444", paddingBottom: "10px" }}>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={barStyle(nacional, "#ff7b72")}>{nacional}%</div>
          <span style={{ fontSize: "24px" }}>Nacional (IPM)</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={barStyle(santander_ipm, "#3fb950")}>{santander_ipm}%</div>
          <span style={{ fontSize: "24px" }}>Santander (IPM)</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={barStyle(bucaramanga_am, "#a371f7")}>{bucaramanga_am}%</div>
          <span style={{ fontSize: "24px" }}>Bucaramanga (Monetaria Max)</span>
        </div>

      </div>
    </div>
  );
};
