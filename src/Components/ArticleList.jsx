import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="ArticleList">
      <h1>News Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <div>
              <h2>{article.title}</h2>
              <p>Author: {article.author}</p>
              <p>Date of Post: {article.created_at.slice(0, 10)}</p>
              <p>Topic: {article.topic}</p>
              <p>Votes: {article.votes}</p>
            </div>
            <img src={article.article_img_url} alt={article.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
