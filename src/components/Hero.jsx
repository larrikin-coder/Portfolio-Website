import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Hero = ({ activePath, setActivePath }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch(activePath)
      .then(res => res.text())
      .then(setMarkdownContent)
      .catch(() => setMarkdownContent('# Error loading content'));
  }, [activePath]);

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light d-flex">
      {/* Profile Section */}
      <div className="col-md-4 bg-secondary p-4 d-flex flex-column align-items-center text-center">
        <img
          src="assets/icon.jpg"
          alt="Profile"
          className="rounded-circle mb-3"
          width="120"
          height="120"
        />
        <h3>Shaurya Thapliyal</h3>
        <p className="text-muted">@larrikin-coder</p>
        <em>"Schrödinger's cat was dead! Curiosity was the culprit."</em>

        <div className="mt-4 w-100">
          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => setActivePath('/markdown/about.md')}
          >
            About Me
          </button>
          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => setActivePath('/markdown/projects.md')}
          >
            Projects
          </button>
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setActivePath('/markdown/techstack.md')}
          >
            Tech Stack
          </button>
        </div>
      </div>

      {/* Markdown Content Section */}
      <div className="col-md-8 p-5 overflow-auto bg-dark">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Hero;
