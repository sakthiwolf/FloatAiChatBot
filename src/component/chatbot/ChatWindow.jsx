import ChartCard from "./ChartCard";
import styles from "../../styles/ChatWindow.module.css";

export default function ChatWindow({ messages }) {
  return (
    <div className={styles.chatWindow}>
      {messages.map((msg, i) => {
        if (msg.type === "user") {
          return (
            <div key={i} className={styles.userMsg}>
              {msg.text}
            </div>
          );
        } else if (msg.type === "bot") {
          return (
            <div key={i} className={styles.botMsg}>
              <img src="/bot-logo.png" alt="Bot" className={styles.botLogo} />
              <div className={styles.botText}>{msg.text}</div>
            </div>
          );
        } else if (msg.type === "chart") {
          return (
            <div key={i} className={styles.botMsg}>
              <img src="/bot-logo.png" alt="Bot" className={styles.botLogo} />
              <ChartCard title={msg.data.title} data={msg.data.data} />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
