import React from "react";

function CommentCard({ comment, onDelete }) {
  const handleDelete = () => {
    onDelete(comment.comment_id);
  };

  return (
    <div className="comment-card">
      <p>
        Posted by <span className="comment-author">{comment.author}</span> on{" "}
        <span className="comment-date">{comment.created_at.slice(0, 10)}</span>
      </p>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CommentCard;
