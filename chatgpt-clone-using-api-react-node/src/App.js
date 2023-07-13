import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState({});
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);

  const API_KEY = <YOUR API KEY>;

  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: value,
          },
        ],
        max_tokens: 100,
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = () => {
    if (value.trim() !== "") {
      setPreviousChats((prevChats) => [
        ...prevChats,
        { role: "user", content: value },
      ]);
      getMessages();
      setValue("");
    }
  };

  useEffect(() => {
    if (!currentTitle && message.role === "assistant") {
      setCurrentTitle(value);
    }
    if (currentTitle && message.role === "assistant") {
      setPreviousChats((prevChats) => [
        ...prevChats,
        { role: "assistant", content: message.content },
      ]);
    }
  }, [message, currentTitle, value]);

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* SIDEBAR SECTION */}
      <section className="sidebar bg-gray-900 p-4 flex flex-col justify-between">
        <button className="bg-blue-500 text-white rounded-md py-2 px-4 mb-4">
          + New Chat
        </button>
        <ul className="history">
          <li className="p-2 bg-gray-800 mb-2 rounded-md">hehe</li>
          <li className="p-2 bg-gray-800 mb-2 rounded-md">hehe</li>
          <li className="p-2 bg-gray-800 mb-2 rounded-md">hehe</li>
        </ul>
        <nav className="text-center">
          <p>
            Made by @heysourin{" "}
            <span className="text-blue-500">➡ LinkedIn, GitHub, Twitter</span>
          </p>
        </nav>
      </section>

      {/* MAIN SECTION */}
      <section className="main flex flex-col justify-between p-4 bg-gray-700">
        <h1 className="text-2xl font-bold mb-4">GPT by @heysourin</h1>
        <ul className="feed flex-1 mb-4">
          {previousChats.map((chat, index) => (
            <li key={index} className={`chat-item ${chat.role}`}>
              {chat.content}
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container flex items-center bg-white rounded-md border border-gray-600 px-4 py-2 w-full">
            <input
              type="text"
              className="flex-grow outline-none text-black font-semibold"
              placeholder="Type a message..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div
              className="submit-btn bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center ml-2 cursor-pointer"
              id="submit"
              onClick={handleSend}
            >
              ➢
            </div>
          </div>
          <p className="info text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vitae
            reprehenderit architecto deserunt fuga exercitationem.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
