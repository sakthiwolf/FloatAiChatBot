import { useState } from "react";
import styles from "../../styles/ChatInput.module.css";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        value={input}
        placeholder="Message Ocean Bot..."
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>➤</button>
    </div>
  );
}
