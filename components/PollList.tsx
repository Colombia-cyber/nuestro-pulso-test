import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

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
  const { user } = useAuth();

  const handleVote = async (pollIndex: number, optionIndex: number) => {
    // TODO: Implement voting logic for authenticated users only
    if (!user) {
      alert('Please sign in to vote');
      return;
    }
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
                <button 
                  onClick={() => handleVote(pollIndex, optionIndex)}
                  disabled={!user}
                  className="auth-button primary"
                  style={{
                    margin: '4px',
                    backgroundColor: !user ? '#d1d5db' : '#2563eb',
                    color: !user ? '#6b7280' : 'white',
                    cursor: !user ? 'not-allowed' : 'pointer'
                  }}
                  title={!user ? 'Please sign in to vote' : ''}
                >
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