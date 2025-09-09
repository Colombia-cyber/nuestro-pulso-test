import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  user: string;
  text: string;
  timestamp: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        user: "You",
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Live Civic Chat</h1>
        <Link href="/">
          <button className="text-blue-600 hover:underline text-sm">← Back to Home</button>
        </Link>
      </div>
      <div className="border rounded-lg bg-white shadow mb-4" style={{ height: "55vh", overflowY: "auto", padding: "1rem" }}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">{msg.user}:</span> <span>{msg.text}</span>
              <span className="ml-2 text-xs text-gray-400">{msg.timestamp}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          aria-label="Type your message"
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={sendMessage}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}