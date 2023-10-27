import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("created_at desc");

  useEffect(() => {
    setLoading(true);

    const fetchArticles = () => {
      getArticles({ sort_by: sortOption })
        .then((response) => {
          setArticles(response.data.articles);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };

    fetchArticles();
  }, [sortOption]);

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
  };

  const sortArticles = (articles) => {
    const [sortColumn, sortOrder] = sortOption.split(" ");

    return articles.slice().sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const sortedArticles = sortArticles(articles);

  return (
    <div className="article-list">
      <h1>News Articles</h1>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="created_at desc">Newest</option>
          <option value="created_at asc">Oldest</option>
          <option value="comment_count desc">Most Comments</option>
          <option value="comment_count asc">Least Comments</option>
          <option value="votes desc">Most Votes</option>
          <option value="votes asc">Least Votes</option>
        </select>
      </div>
      <ul>
        {sortedArticles.map((article) => (
          <li key={article.article_id}>
            <div>
              <h2 className="article-title">
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </h2>
              <p>
                Author: <span id="article-author">{article.author}</span>
              </p>
              <p>
                Date of Post:{" "}
                <span id="article-date">{article.created_at.slice(0, 10)}</span>
              </p>
              <p id="article-info">Topic: {article.topic}</p>
              <p id="article-info">Votes: {article.votes}</p>
            </div>
            <img
              id="article-img"
              src={article.article_img_url}
              alt={`An image of ${article.title}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
