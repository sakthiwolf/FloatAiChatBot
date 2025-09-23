import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ChartCard({ title, labels, values, chartType, color }) {
  const canvasRef = useRef();

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: chartType,
      data: {
        labels,
        datasets: [{
          label: title,
          data: values,
          borderColor: color,
          backgroundColor: chartType === "line" ? `${color}55` : color,
          borderWidth: 3,
          tension: 0.4,
          fill: chartType === "line"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#fff" }, grid: { color: "#2c4a77" } },
          y: { ticks: { color: "#fff" }, grid: { color: "#2c4a77" } }
        }
      }
    });
    return () => chart.destroy();
  }, [labels, values, chartType, color, title]);

  return (
    <div className="bot-message">
      <div className="chart-card">
        <div className="chart-header">{title}</div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
