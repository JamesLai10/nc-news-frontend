import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const { article_id, title, author, created_at, body, article_img_url } =
    article;

  return (
    <div className="article-card">
      <h3>
        <Link to={`/articles/${article_id}`}>{title}</Link>
      </h3>
      <p>
        By <span id="article-author">{author}</span>
      </p>
      <p>
        Date of Post: <span id="article-date">{created_at.slice(0, 10)}</span>
      </p>
      {article_img_url && (
        <img
          src={article_img_url}
          alt={`An image of ${title}`}
          className="article-image"
        />
      )}
      <br></br>
      <Link to={`/articles/${article_id}`}>Read More</Link>
    </div>
  );
}

export default ArticleCard;
