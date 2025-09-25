import React, { useState } from "react";
import Sidebar from "../../component/chatbot/Sidebar";
import ChatBox from "../../component/chatbot/ChatBox";
import ChatInput from "../../component/chatbot/ChatInput";
import ChartCard from "../../component/chatbot/ChartCard";
import MapCard from "../../component/chatbot/MapCard";
import styles from "../../styles/ChatPage.module.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I’m your AI Ocean Assistant 🌊\nTry asking me about temperature, salinity, or sea level 📊",
    },
  ]);
  const [role, setRole] = useState("student");

  // Handle user input
  const handleSend = (input) => {
    // 1. Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    // 2. Generate bot response based on role
    let response = { type: "bot", text: "" };

    if (role === "fisherman") {
      response.text = "Best fishing zones are shown on the map 🐟.";
      response.mapData = [
        [20, 77, 0.8],
        [-10, -50, 0.7],
        [40, 10, 0.6],
      ];
    } else if (role === "policy") {
      response.text = "Here’s the 5-year ocean temperature trend 📈.";
      response.chartData = {
        title: "Temperature Trends",
        labels: ["2021", "2022", "2023", "2024", "2025"],
        values: [22, 23, 23.5, 24, 24.3],
        chartType: "line",
        color: "#007bff",
      };
    } else if (role === "researcher") {
      response.text = "Here’s salinity variation across months 🌊.";
      response.chartData = {
        title: "Salinity Levels",
        labels: ["Jan", "Feb", "Mar"],
        values: [35, 34.8, 35.2],
        chartType: "bar",
        color: "#28a745",
      };
    } else if (role === "student") {
      response.text =
        "Ocean temperature means how warm the water is 🌡️. Higher temperatures affect marine life!";
    }

    // 3. Add bot response
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className={styles.app}>
      <Sidebar />

      <main className={styles.chatMain}>
        {/* Role Selector */}
        <div className={styles.roleSelector}>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="fisherman">Fisherman</option>
            <option value="policy">Policy Maker</option>
            <option value="researcher">Researcher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Messages */}
        <ChatBox
          messages={messages.map((msg, i) => {
            if (msg.type === "bot" && msg.chartData) {
              return (
                <ChartCard
                  key={i}
                  title={msg.chartData.title}
                  labels={msg.chartData.labels}
                  values={msg.chartData.values}
                  chartType={msg.chartData.chartType}
                  color={msg.chartData.color}
                />
              );
            }
            if (msg.type === "bot" && msg.mapData) {
              return <MapCard key={i} data={msg.mapData} />;
            }
            return msg;
          })}
        />

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
};

export default ChatPage;
