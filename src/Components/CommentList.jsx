import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import CommentCard from "./CommentCard";

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
      <Link to="/articles" className="back-button">
        Back to Articles
      </Link>
      <h2 className="comment-header">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
