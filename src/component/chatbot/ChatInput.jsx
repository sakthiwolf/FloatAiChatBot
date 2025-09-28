import { useState } from "react";
import styles from "../../styles/ChatInput.module.css";

// Ocean Q&A Knowledge Base (longer answers)
const oceanQA = [
  { 
    q: "why is the ocean salty", 
    a: "🌊 The ocean is salty because over millions of years, rainwater eroded rocks on land and carried minerals into rivers. These rivers transported dissolved salts, mainly sodium and chloride, into the ocean. Since water evaporates from the ocean’s surface but salt stays behind, the concentration of salt increases over time, making the ocean salty."
  },
  { 
    q: "what causes ocean tides", 
    a: "🌕 Ocean tides are caused primarily by the gravitational pull of the Moon, and to a lesser extent, the Sun. As the Moon’s gravity pulls on Earth’s oceans, it creates bulges of water—high tides—on the side closest to the Moon and the opposite side. The areas in between experience low tides. This cycle happens twice a day, shaping coastal life and ecosystems."
  },
  { 
    q: "largest ocean", 
    a: "🌊 The Pacific Ocean is the largest ocean on Earth, covering more than 60 million square miles (155 million km²). It is so vast that it contains more water than all the Earth’s landmasses combined. The Pacific also holds the deepest trenches, thousands of islands, and plays a crucial role in regulating Earth’s climate."
  },
  { 
    q: "deepest point in ocean", 
    a: "🌊 The Mariana Trench, located in the western Pacific Ocean, is the deepest part of the world’s oceans. Its deepest point, called the Challenger Deep, plunges to about 11,000 meters (36,000 feet) below sea level. To give perspective, if Mount Everest were placed inside the trench, its peak would still be more than 2,000 meters underwater."
  },
  { 
    q: "ocean layers", 
    a: "🌊 The ocean is divided into five main layers based on depth and light:\n\n"
      + "1️⃣ **Epipelagic (0–200m)** – The Sunlight Zone where most marine life and photosynthesis occur.\n\n"
      + "2️⃣ **Mesopelagic (200–1000m)** – The Twilight Zone, with faint light and bioluminescent creatures.\n\n"
      + "3️⃣ **Bathypelagic (1000–4000m)** – The Midnight Zone, completely dark and home to strange deep-sea species.\n\n"
      + "4️⃣ **Abyssopelagic (4000–6000m)** – The Abyss, icy cold, near freezing, and very high pressure.\n\n"
      + "5️⃣ **Hadalpelagic (6000m+)** – The Trenches, the deepest, most extreme environment on Earth.\n\n"
      + "👉 Each layer has unique ecosystems adapted to pressure, darkness, and temperature."
  }
];

export default function ChatInput({ setMessages }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    // Bot response
    setTimeout(() => {
      const msg = input.toLowerCase();

      // Try to match with Q&A
      const found = oceanQA.find(item => msg.includes(item.q));
      if (found) {
        setMessages((prev) => [...prev, { type: "bot", text: found.a }]);
      }
      // Histogram example
      else if (msg.includes("pollution chart") || msg.includes("histogram")) {
        setMessages((prev) => [
          ...prev,
          {
            type: "chart",
            data: {
              title: "Ocean Plastic Pollution (in million tons)",
              data: [
                { label: "2015", value: 8 },
                { label: "2018", value: 12 },
                { label: "2021", value: 20 },
                { label: "2024", value: 30 }
              ]
            }
          }
        ]);
      }
      // Default fallback
      else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "🤔 I don’t know that yet, but I’m learning! Try asking about ocean salt, tides, layers, or the deepest point." }
        ]);
      }
    }, 500);

    setInput("");
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        value={input}
        placeholder="Ask Ocean Bot anything..."
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>➤</button>
    </div>
  );
}
