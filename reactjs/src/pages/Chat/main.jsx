import { useState } from "react";
import { Send, Bot, User, Menu, Upload } from "lucide-react";
import { post, upload } from "../../utils/request";
import { Link } from "react-router-dom";
import Logout from "../../components/Logout/main";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me anything.", sender: "Bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage = { text: input, sender: "You" };
    setMessages([...messages, userMessage]);
    const input_tmp = input
    setInput("");
    setLoading(true);
    const result = await post("questions/1", { "content": input_tmp })

    setLoading(false);
    const answer = result.content
    const botResponse = { text: answer, sender: "Bot" };
    setMessages([...messages, userMessage, botResponse]);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const result = await upload("texts", file)
    if (file) {
      setMessages([...messages, { text: `Uploaded: ${file.name}`, sender: "You" }]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <Menu className="text-lg font-semibold mb-4">Menu</Menu>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-200 rounded-lg cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 bg-gray-200 rounded-lg cursor-pointer">Chat 1</li>
          <li className="p-2 bg-gray-200 rounded-lg cursor-pointer">New Chat</li>
        </ul>
        <div className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
      <Logout/>
      </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${msg.sender === "You" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"
                }`}
            >
              {msg.sender === "Bot" && <Bot className="inline-block mr-2" size={16} />}
              {msg.sender === "You" && <User className="inline-block mr-2" size={16} />}
              {msg.text}
            </div>
          ))}
          {loading && <div className="p-3 bg-gray-300 rounded-lg w-fit">Typing...</div>}
        </div>
        <div className="flex items-center gap-2 p-2 border-t">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="p-2 bg-gray-200 rounded-lg cursor-pointer">
            <Upload size={20} />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Message"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
