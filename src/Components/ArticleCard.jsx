import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const { article_id, title, author, created_at, body } = article;

  return (
    <div className="ArticleCard">
      <h3>
        <Link to={`/articles/${article_id}`}>{title}</Link>
      </h3>
      <p>
        By <span id="article-author">{author}</span>
      </p>
      <p>
        Date of Post: <span id="article-date">{created_at.slice(0, 10)}</span>
      </p>
      <Link to={`/articles/${article_id}`}>Read More</Link>
    </div>
  );
}

export default ArticleCard;
