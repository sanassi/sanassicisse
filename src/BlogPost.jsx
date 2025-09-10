import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import fm from "front-matter";

import "./BlogPost.css";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const file = await import(`./posts/${slug}.md?raw`);
        const { attributes, body } = fm(file.default || file);
        setPost({ ...attributes, body });
      } catch (err) {
        console.log(err);
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
      <ReactMarkdown>{post.body}</ReactMarkdown>
    </div>
  );
}

export default BlogPost;
