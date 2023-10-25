import { useState } from "react";
import { updateArticleVotes } from "../utils/api";

function Vote({ votes, article_id }) {
  const [userVotes, setUserVotes] = useState(0);
  const [error, setError] = useState(null);

  const handleVote = (value) => {
    setUserVotes((currentVotes) => {
      return currentVotes + value;
    });

    updateArticleVotes(article_id, value)
      .then((response) => {
        console.log(response.data.article.votes);
      })
      .catch((error) => {
        setError("Vote could not be processed. Please try again.");
        console.log("Error updating Votes: ", error);
      });
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
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
