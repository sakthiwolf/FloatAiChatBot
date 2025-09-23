import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function MapCard() {
  useEffect(() => {
    const map = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const heatData = [
      [0, 0, 0.5],
      [20, 77, 0.8],
      [-10, -50, 0.7],
      [40, 10, 0.6]
    ];
    L.heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 6 }).addTo(map);
  }, []);

  return (
    <div className="bot-message">
      <div id="map" style={{ width: "100%", height: "300px", borderRadius: "12px" }}></div>
    </div>
  );
}
