import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from "recharts";
import styles from "../../styles/DashboardCard.module.css";

export default function DashboardCard({ title, scatterData, histogramData, info }) {
  return (
    <div className={styles.dashboard}>
      <h2>{title}</h2>

      <div className={styles.grid}>
        {/* Temperature Profiles (Scatter) */}
        <div className={styles.card}>
          <h3>Temperature Profiles</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="temp" name="Temperature" unit="°C" />
              <YAxis dataKey="depth" name="Depth" unit="dbar" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} fill="#ff7300" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram */}
        <div className={styles.card}>
          <h3>Temperature Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4a90e2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Info Box */}
        <div className={styles.infoBox}>
          <h3>Summary</h3>
          <p>🌊 Records: {info.records}</p>
          <p>🌡️ Mean Temp: {info.mean} °C</p>
          <p>📊 Range: {info.range}</p>
          <ul>
            {info.features.map((f, i) => <li key={i}>• {f}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
