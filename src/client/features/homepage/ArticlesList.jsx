import React from "react";
import ArticlesCard from "./articlesCard";
import QuiverData from "./QuiverData";

export default function ArticlesList({ articles }) {
  // Check if articles is undefined or empty
  // if (!articles || articles.length === 0) {
  //   return <p>No articles available.</p>;
  // }
  // console.log(articles);
  return (
    <>
      <div className="article-container">
        <h2>Latest Articles</h2>
        {articles.map((article) => (
          <ArticlesCard key={article.uuid} article={article} />
        ))}
      </div>
      <div>
        <QuiverData />
      </div>
    </>
  );
}
