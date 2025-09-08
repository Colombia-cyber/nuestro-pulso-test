import { useState } from "react";

export default function PollList({ polls, refreshPolls }) {
  const [voted, setVoted] = useState(false);

  const handleVote = async (pollIndex: number, optionIndex: number) => {
    await fetch("/api/colombia/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pollIndex, optionIndex }),
    });
    setVoted(true);
    refreshPolls();
    setTimeout(() => setVoted(false), 2000);
  };

  return (
    <div>
      {polls.map((poll, i) => (
        <div key={i} className="mb-6">
          <h3 className="font-bold">{poll.question}</h3>
          <ul>
            {poll.options.map((opt, j) => (
              <li key={j}>
                <button
                  className="text-left w-full px-2 py-1 bg-yellow-100 hover:bg-yellow-200 rounded"
                  onClick={() => handleVote(i, j)}
                  disabled={voted}
                >
                  {opt} — <span className="text-gray-700">{poll.votes[j]} votos</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {voted && (
        <div className="text-green-600 mt-2">¡Gracias por votar!</div>
      )}
    </div>
  );
}