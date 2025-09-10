import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const file = await import(`./posts/${slug}.md`);
        const raw = file.default;
        const { data, content } = matter(raw);
        setPost({ ...data, content });
      } catch {
        setPost({ title: "Not Found", content: "This post does not exist." });
      }
    }
    loadPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
}

export default BlogPost;
