import React, { useState, useEffect } from "react";
import Sidebar from "../../component/chatbot/Sidebar";
import ChatBox from "../../component/chatbot/ChatBox";
import ChatInput from "../../component/chatbot/ChatInput";
import HamburgerMenu from "../../component/chatbot/HamburgerMenu";
import styles from "../../styles/ChatPage.module.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm your AI Ocean Assistant 🌊\nTry asking me about temperature, salinity, or sea level 📊",
    },
  ]);
  
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open

  const toggleSidebar = () => {
    console.log('Hamburger clicked! Current state:', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth <= 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <div className={styles.app}>
      {/* Overlay for mobile */}
      {sidebarOpen && <div className={`${styles.overlay} ${sidebarOpen ? styles.show : ''}`} onClick={closeSidebar} />}
      
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className={styles.chatMain}>
        <div className={styles.header}>
          <HamburgerMenu isOpen={sidebarOpen} onClick={toggleSidebar} />
          <button 
            onClick={toggleSidebar}
            className={styles.toggleButton}
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              backgroundColor: '#0078d7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Toggle Menu
          </button>
          <span className={styles.sidebarStatus} style={{color: 'white', marginLeft: '10px', fontSize: '12px'}}>
            Sidebar: {sidebarOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
        <ChatBox messages={messages} />
        <ChatInput setMessages={setMessages} />
      </main>
    </div>
  );
};

export default ChatPage;
