import React, { useState, useEffect } from "react";
import { getCommentsByArticleId, deleteComment } from "../utils/api";
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

  const handleDeleteComment = (comment_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this comment?"
    );

    if (confirmDelete) {
      deleteComment(comment_id)
        .then(() => {
          setComments(
            comments.filter((comment) => comment.comment_id !== comment_id)
          );
        })
        .catch((error) => {
          console.error("Error deleting comment: ", error);
        });
    }
  };

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
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            onDelete={handleDeleteComment}
          />
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
