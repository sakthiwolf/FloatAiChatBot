import React, { useState } from "react";
import Sidebar from "../../component/chatbot/Sidebar";
import ChatBox from "../../component/chatbot/ChatBox";
import ChatInput from "../../component/chatbot/ChatInput";
import styles from "../../styles/ChatPage.module.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I’m your AI Ocean Assistant 🌊\nTry asking me about temperature, salinity, or sea level 📊",
    },
  ]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.chatMain}>
        <ChatBox messages={messages} />
        <ChatInput setMessages={setMessages} />
      </main>
    </div>
  );
};

export default ChatPage;
