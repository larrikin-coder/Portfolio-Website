import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Hero = ({ activePath, setActivePath }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch(activePath)
      .then((res) => res.text())
      .then(setMarkdownContent)
      .catch(() => setMarkdownContent('# Error loading content'));
  }, [activePath]);

  return (
    <div className="container-fluid m-0 p-0 bg-dark text-light min-vh-100">
      <div className="row g-0 flex-column flex-md-row">
        {/* Profile Section */}
        <div className="col-12 col-md-4 bg-dark p-4 d-flex flex-column align-items-center text-center border-end border-light">
          <img
            src="assets/icon.png"
            alt="Profile"
            className="rounded-circle mb-3"
            width="296"
            height="296"
          />
          <h3>Shaurya Thapliyal</h3>
          <p className="text-light-50">@larrikin-coder</p>
          <em className="small text-light">"Schrödinger's cat was dead. Curiosity was the culprit."</em>

          <div className="mt-4 w-100 d-grid gap-2">
            <button className="btn btn-light" onClick={() => setActivePath('/markdown/about.md')}>
              About Me
            </button>
            <button className="btn btn-light" onClick={() => setActivePath('/markdown/projects.md')}>
              Projects
            </button>
            <button className="btn btn-light" onClick={() => setActivePath('/markdown/techstack.md')}>
              Tech Stack
            </button>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="col-12 col-md-8 p-4 bg-dark overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Hero;
