import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";

function CommentList() {
  const { article_id } = useParams();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p className="loading">Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="CommentList">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>
              Posted by <span id="comment-author">{comment.author}</span> on{" "}
              <span id="comment-date">{comment.created_at.slice(0, 10)}</span>
            </p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
