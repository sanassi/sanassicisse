import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    function loadPosts() {
      const context = require.context("./posts", false, /\.md$/);
      const loaded = context.keys().map((key) => {
        const file = context(key);
        const raw = file.default;
        console.log(file);
        const { data } = matter(raw);
        const slug = key.replace("./", "").replace(".md", "");
        return { ...data, slug };
      });
      setPosts(loaded.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
    loadPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="text-blue-500">
              {post.title}
            </Link>{" "}
            <span className="text-gray-500">({post.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
