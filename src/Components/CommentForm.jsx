import { useState } from "react";
import { postComment } from "../utils/api";

function CommentForm({ article_id, username, onCommentSubmitted }) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (body.trim() === "") {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLoading(true);

    const username = "jessjelly";

    postComment(article_id, username, body)
      .then(() => {
        setLoading(false);
        setBody("");
      })
      .catch((error) => {
        console.log("Error posting comment: ", error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        className="textarea-comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add your comment..."
      ></textarea>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Comment"}
      </button>
      {showError && body.trim() === "" && (
        <p className="comment-form">Please enter a comment!</p>
      )}
    </form>
  );
}

export default CommentForm;
