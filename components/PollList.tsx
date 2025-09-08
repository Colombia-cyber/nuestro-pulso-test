import { useState } from "react";

// Define the type for a single poll.
// Add more fields if your poll objects have them.
type Poll = {
  id: number;
  question: string;
  options: string[];
  // For example: votes?: number[];
};

type PollListProps = {
  polls: Poll[];
  refreshPolls: () => void;
};

export default function PollList({ polls, refreshPolls }: PollListProps) {
  const [voted, setVoted] = useState(false);

  const handleVote = async (pollIndex: number, optionIndex: number) => {
    // your voting logic here
  };

  return (
    <div>
      {polls.map((poll, pollIndex) => (
        <div key={poll.id}>
          <h3>{poll.question}</h3>
          <ul>
            {poll.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <button onClick={() => handleVote(pollIndex, optionIndex)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}