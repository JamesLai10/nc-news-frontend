import { useState } from "react";

function Vote({ votes }) {
  const [userVotes, setUserVotes] = useState(0);

  const updateVotes = (value) => {
    setUserVotes((currentVotes) => {
      return currentVotes + value;
    });
  };

  return (
    <div>
      <p>Votes: {votes + userVotes}</p>
      <button
        disabled={userVotes === 1}
        aria-label="Upvote"
        onClick={() => {
          updateVotes(1);
        }}
      >
        +
      </button>
      <button
        disabled={userVotes === -1}
        aria-label="dislike"
        onClick={() => {
          updateVotes(-1);
        }}
      >
        -
      </button>
    </div>
  );
}

export default Vote;
