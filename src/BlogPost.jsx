import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import fm from "front-matter";
import { Link } from "react-router-dom";

import "./BlogPost.css";

function buildHeadingsTree(markdown) {
  const lines = markdown.split("\n");
  const headings = [];
  // use a stack to keeptrack of the headings depth
  // then attach to the current heading any child heading we might encounter
  // if we encounter a lower heading (ex a ## after a ###) pop until reach the parent
  // if same level pop -> get the parent, and update children attr
  const stack = [];

  lines.forEach((line) => {
    const match = /^(#{1,6})\s+(.*)/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, "-");

      // id used to scroll to heading later
      const node = { id, text, level, children: [] };

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        headings.push(node);
      } else {
        stack[stack.length - 1].children.push(node);
      }
      stack.push(node);
    }
  });

  return headings;
}

function Tree({ nodes }) {
  return (
    <ul className="tree-list">
      {nodes.map((h) => (
        <li key={h.id}>
          <button
            className="tree-button"
            onClick={() =>
              document
                .getElementById(h.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {h.text}
          </button>
          {h.children.length > 0 && <Tree nodes={h.children} />}
        </li>
      ))}
    </ul>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    async function loadPost() {
      try {
        const file = await import(`./posts/${slug}.md?raw`);
        const { attributes, body } = fm(file.default || file);
        setPost({ ...attributes, body });
        setHeadings(buildHeadingsTree(body));
      } catch (err) {
        console.log(err);
        setPost({ title: "Not Found", body: "This post does not exist." });
      }
    }
    loadPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-layout">
      {/* Sidebar Tree */}
      <aside className="blog-sidebar">
        <h3>On this page</h3>
        <Tree nodes={headings} />
      </aside>

      {/* Blog Content */}
      <div className="blog-post-container">
        <Link to={"/blog"}>Back</Link>
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1
                id={String(props.children).toLowerCase().replace(/\s+/g, "-")}
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                id={String(props.children).toLowerCase().replace(/\s+/g, "-")}
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                id={String(props.children).toLowerCase().replace(/\s+/g, "-")}
                {...props}
              />
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default BlogPost;
