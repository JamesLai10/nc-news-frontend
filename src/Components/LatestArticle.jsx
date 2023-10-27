import React, { useState, useEffect } from "react";
import { getLatestArticle } from "../utils/api";
import { Link } from "react-router-dom";
function LatestArticle() {
  const [latestArticle, setLatestArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLatestArticle()
      .then((response) => {
        setLatestArticle(response.data.articles[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading latest article...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="latest-article">
      <div>
        <h2>Latest News!</h2>
        <h3>{latestArticle.title}</h3>
        <p>
          By <span id="article-author">{latestArticle.author}</span>
        </p>
        <p>
          Date of Post:{" "}
          <span id="article-author">
            {latestArticle.created_at.slice(0, 10)}
          </span>
        </p>
        <img src={latestArticle.article_img_url} alt="Article Image" />
        <p>
          <Link to={`/articles/${latestArticle.article_id}`}>
            Learn more about this article!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LatestArticle;
