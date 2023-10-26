import { useState, useEffect } from "react";
import { getArticlesByTopic } from "../utils/api";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticlesByTopic() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();

  useEffect(() => {
    getArticlesByTopic(topic)
      .then((response) => {
        console.log(response.data.articles);
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [topic]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (articles.length === 0) {
    return <p>No articles found for this topic</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>{`Articles for ${topic}`}</h2>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default ArticlesByTopic;
