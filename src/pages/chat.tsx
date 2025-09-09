import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const DEFAULT_TOPICS = [
  { name: "General", icon: "💬" },
  { name: "News", icon: "📰" },
  { name: "Reels", icon: "🎬" },
  { name: "Feeds", icon: "📢" },
];

type Message = {
  user: string;
  text: string;
  timestamp: string;
  topic: string;
};

export default function ChatPage() {
  const [topics, setTopics] = useState(DEFAULT_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState(topics[0].name);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [highlights, setHighlights] = useState<Record<string, string>>({});
  const [highlightInput, setHighlightInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedTopic]);

  // Show only messages for selected topic
  const visibleMessages = messages.filter(msg => msg.topic === selectedTopic);

  // Add a message
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        user: "You",
        text: input,
        timestamp: new Date().toLocaleTimeString(),
        topic: selectedTopic,
      },
    ]);
    setInput("");
  };

  // Add a new topic
  const addTopic = () => {
    const name = newTopic.trim();
    if (!name || topics.some(t => t.name.toLowerCase() === name.toLowerCase())) return;
    setTopics([...topics, { name, icon: "💡" }]);
    setNewTopic("");
    setSelectedTopic(name);
  };

  // Set highlight for topic
  const setTopicHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights({ ...highlights, [selectedTopic]: highlightInput });
    setHighlightInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-2">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-bold">Nuestro Pulso Civic Hub</h1>
        <Link href="/">
          <button className="text-blue-600 hover:underline text-sm">← Home</button>
        </Link>
      </div>

      {/* Topic selection bar */}
      <div className="flex gap-2 overflow-x-auto mb-3">
        {topics.map(t => (
          <button
            key={t.name}
            className={`px-3 py-1 rounded text-sm font-semibold flex items-center gap-1 border ${
              selectedTopic === t.name
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
            onClick={() => setSelectedTopic(t.name)}
          >
            <span>{t.icon}</span> {t.name}
          </button>
        ))}
      </div>

      {/* Add topic */}
      <div className="flex gap-1 mb-3">
        <input
          value={newTopic}
          onChange={e => setNewTopic(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Suggest a new topic (e.g. Sports, Tech)…"
        />
        <button
          className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
          onClick={addTopic}
        >
          Add
        </button>
      </div>

      {/* Highlight for topic */}
      <div className="mb-2">
        <div className="flex gap-1 items-center">
          <input
            value={highlightInput}
            onChange={e => setHighlightInput(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-sm"
            placeholder={`Highlight this topic for others (like a pinned tweet)…`}
          />
          <button
            className="bg-yellow-400 text-black px-2 py-1 text-sm rounded hover:bg-yellow-500"
            onClick={setTopicHighlight}
          >
            Highlight
          </button>
        </div>
        {highlights[selectedTopic] && (
          <div className="mt-2 p-2 rounded bg-yellow-100 text-yellow-800 text-sm font-semibold border-l-4 border-yellow-400">
            <span className="mr-1">🔖</span> {highlights[selectedTopic]}
          </div>
        )}
      </div>

      {/* Chat feed */}
      <div
        className="border rounded-lg bg-white shadow mb-2"
        style={{ height: "40vh", overflowY: "auto", padding: "1rem" }}
      >
        {visibleMessages.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            No messages yet in <span className="font-bold">{selectedTopic}</span>.<br />
            Start the conversation—share news, reels, comments, or just say hi!
          </div>
        ) : (
          visibleMessages.map((msg, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-blue-700">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
              </div>
              <div className="ml-2">{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder={`Share something in "${selectedTopic}"…`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          aria-label="Type your message"
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
          onClick={sendMessage}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
      <div className="text-xs text-center mt-3 text-gray-400">
        Civic conversations: choose or create a topic, highlight what matters, share news, reels, and more. Real-time chat coming soon!
      </div>
    </div>
  );
}