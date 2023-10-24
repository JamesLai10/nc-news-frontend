import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../utils/api";
import Vote from "./Vote";

function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="ArticleDetail">
      <h2>{article.title}</h2>
      <p>
        By <span id="article-author">{article.author}</span>
      </p>
      <p>
        Date of Post:{" "}
        <span id="article-date">{article.created_at.slice(0, 10)}</span>
      </p>
      <p>{article.body}</p>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={`An image of ${article.title}`}
        />
      )}
      <Vote votes={article.votes} />
      <p>{article.body}</p>
      <Link to={`/articles/${article_id}/comments`}>View Comments!</Link>
    </div>
  );
}

export default ArticleDetail;
