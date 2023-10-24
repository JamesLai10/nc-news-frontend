import { useState } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import ArticleList from "./Components/ArticleList";
import ArticleDetail from "./Components/ArticleDetail";
import CommentList from "./Components/CommentList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <NavBar />
        </nav>
        <Routes>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
          <Route
            path="/articles/:article_id/comments"
            element={<CommentList />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
