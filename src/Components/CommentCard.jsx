import React from "react";
import Vote from "./Vote";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p>
        Posted by <span className="comment-author">{comment.author}</span> on{" "}
        <span className="comment-date">{comment.created_at.slice(0, 10)}</span>
      </p>
      <p>{comment.body}</p>
      <p>
        <Vote votes={comment.votes} />
      </p>
    </div>
  );
}

export default CommentCard;
