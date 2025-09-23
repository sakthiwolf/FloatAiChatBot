import styles from "../../styles/ChatBox.module.css";
import ChartCard from "./ChartCard";
import MapCard from "./MapCard";

export default function ChatBox({ messages }) {
  return (
    <div className={styles.chatBox}>
      {messages.map((msg, i) => {
        if (msg.type === "chart") return <ChartCard key={i} {...msg.data} />;
        if (msg.type === "map") return <MapCard key={i} />;
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
