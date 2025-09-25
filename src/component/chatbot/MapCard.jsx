import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function MapCard({ data }) {
  useEffect(() => {
    const map = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    if (data && data.length) {
      L.heatLayer(data, { radius: 25, blur: 15, maxZoom: 6 }).addTo(map);
    }
  }, [data]);

  return (
    <div className="bot-message">
      <div id="map" style={{ width: "100%", height: "300px", borderRadius: "12px" }}></div>
    </div>
  );
}
