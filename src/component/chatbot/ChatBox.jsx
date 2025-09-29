import styles from "../../styles/ChatBox.module.css";
import ChartCard from "./ChartCard";
import MapCard from "./MapCard";
import DashboardCard from "./DashboardCard";


export default function ChatBox({ messages }) {
  return (
    <div className={styles.chatBox}>
      {messages.map((msg, i) => {
        if (msg.type === "chart") return <ChartCard key={i} {...msg.data} />;
        if (msg.type === "map") return <MapCard key={i} />;
        if (msg.type === "dashboard") return <DashboardCard key={i} {...msg.data} />;
        return (
          <div
            key={i}
            className={msg.type === "user" ? styles.userMessage : styles.botMessage}
          >
            {msg.text}
          </div>
        );
      })}
    </div>
  );
}
