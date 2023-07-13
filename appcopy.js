import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState({});

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        messages: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log("ddata",data);
      setMessage(data.choices[0].message); //?an object of conent and role
      // console.log(message);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("msg",message);
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
          {/* TODO: Add logic to generate chat messages */}
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
              onClick={getMessages}
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
