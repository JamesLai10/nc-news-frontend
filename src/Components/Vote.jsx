import { useState } from "react";
import { updateArticleVotes } from "../utils/api";

function Vote({ votes, article_id }) {
  const [userVotes, setUserVotes] = useState(0);

  const handleVote = (value) => {
    setUserVotes((currentVotes) => {
      return currentVotes + value;
    });

    updateArticleVotes(article_id, value);
  };

  return (
    <div>
      <p>Votes: {votes + userVotes}</p>
      <button
        disabled={userVotes === 1}
        aria-label="Upvote"
        onClick={() => {
          handleVote(1);
        }}
      >
        +
      </button>
      <button
        disabled={userVotes === -1}
        aria-label="dislike"
        onClick={() => {
          handleVote(-1);
        }}
      >
        -
      </button>
    </div>
  );
}

export default Vote;
