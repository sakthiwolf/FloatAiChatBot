import { useState } from "react";
import ChatInput from "./ChatInput";
import ChartCard from "./ChartCard";
import MapCard from "./MapCard";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState("student");

  const handleSend = (input) => {
    // add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    // simulate role-based bot response
    let response = { type: "bot", text: "" };

    if (role === "fisherman") {
      response.text = "Best fishing zones are shown on the map.";
      response.mapData = [
        [20, 77, 0.8],
        [-10, -50, 0.7],
        [40, 10, 0.6],
      ];
    } else if (role === "policy") {
      response.text = "Here’s the 5-year ocean temperature trend.";
      response.chartData = {
        title: "Temperature Trends",
        labels: ["2021", "2022", "2023", "2024", "2025"],
        values: [22, 23, 23.5, 24, 24.3],
        chartType: "line",
        color: "#007bff",
      };
    } else if (role === "researcher") {
      response.text = "Here’s salinity variation across months.";
      response.chartData = {
        title: "Salinity Levels",
        labels: ["Jan", "Feb", "Mar"],
        values: [35, 34.8, 35.2],
        chartType: "bar",
        color: "#28a745",
      };
    } else if (role === "student") {
      response.text = "Ocean temperature means how warm the water is 🌊.";
    }

    // add bot message
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className="chatbot">
      {/* Role Selector */}
      <div className="role-selector">
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="fisherman">Fisherman</option>
          <option value="policy">Policy Maker</option>
          <option value="researcher">Researcher</option>
          <option value="student">Student</option>
        </select>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={msg.type === "user" ? "user-message" : "bot-message"}>
            {msg.text && <p>{msg.text}</p>}
            {msg.chartData && (
              <ChartCard
                title={msg.chartData.title}
                labels={msg.chartData.labels}
                values={msg.chartData.values}
                chartType={msg.chartData.chartType}
                color={msg.chartData.color}
              />
            )}
            {msg.mapData && <MapCard data={msg.mapData} />}
          </div>
        ))}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
