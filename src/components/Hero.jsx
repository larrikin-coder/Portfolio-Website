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

  const isOverview = activePath.includes('about.md');


  return (
    <div className="container-fluid m-0 p-0  text-light min-vh-100">
      <div className="row g-0 flex-column flex-md-row ps-5 pe-5">
        {/* Profile Section */}
        <div className="col-12 col-md-4 mt-5 p-4 d-flex flex-column align-items-justify text-start">
          <img
            src="assets/icon.png"
            alt="Profile"
            className="rounded-circle mb-3 border border-light"
            width="296"
            height="296"
          />
          <h3  className='text-start'>Shaurya Thapliyal</h3>
          <div className="fs-5 fw-light text-body-primary">larrikin-coder [he/him]</div>
          <div className="mt-2 fs-6 fw-bold text-body-primary">Schrödinger's cat was dead ! Curiosity was the culprit.</div>
          <button className='btn btn-secondary border border-light text-align-center fs-6 fw-medium mt-4' type="button">Edit profile</button>

        </div>

        {/* Markdown Content */}
        {/* <div className="col-12 col-md-8 p-4 bg-dark overflow-auto"> */}
        <div className={`col-12 col-md-8 p-4 overflow-auto rounded-2 ${isOverview ? 'border border-secondary mt-5 border-rounded-5' : ''}`}>

          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Hero;
