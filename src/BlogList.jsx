import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const files = import.meta.glob("./posts/*.md", { as: "raw" });
      const loaded = await Promise.all(
        Object.keys(files).map(async (path) => {
          const raw = await files[path]();
          //const { data } = matter(raw);
          const { attributes } = fm(raw);
          const slug = path.split("/").pop().replace(".md", "");
          return { ...attributes, slug };
        }),
      );
      setPosts(
        loaded.sort(
          (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date),
        ),
      );
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
