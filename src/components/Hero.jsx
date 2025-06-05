import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PinnedRepos from './PinnedRepo';
import ContributionGraph from './ContributionsGraph';

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
        <div className="col-12 col-md-4 mt-5 ms-0 p-4 d-flex flex-column align-items-justify text-start">
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
          <div className='pt-4'><span><img src='assets/icons8-location-48.png' height="16px" width="16px"></img></span>Earth</div>
          <div className='pt-1'><span><img src='assets/icons8-linkedin-30.png' height="16px" width="16px"></img></span><a href='https://www.linkedin.com/in/shaurya-thapliyal/'>Linkedin</a></div>
          <div className='pt-1'><span><img src="assets/icons8-instagram-50.png" height="16px" width="16px"></img></span><a href=''>Instagram</a></div>
          <div className='pt-1'><span><img src="assets/icons8-chain-48.png" height="16px" width="16px"></img></span><a href='https://huggingface.co/larrikin-coder'>Huggingface</a></div>
          <hr className="border-top border-light opacity-50 mt-4 mb-2" />
          <h5 className='mt-3'>Achievements</h5>
          <div><img src='https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png' height="64px" width="64px"></img></div>
        </div>

        {/* Markdown Content */}
        {/* <div className="col-12 col-md-8 p-4 bg-dark overflow-auto"> */}
        <div className="col-12 col-md-8 p-4 overflow-auto mt-5">
        {/* Markdown Section with conditional border */}
        <div className={`p-4 rounded-2 ${isOverview ? 'border border-secondary' : ''}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdownContent}
          </ReactMarkdown>
        </div>

        {/* Conditionally show PinnedRepos on overview */}
        {isOverview && <PinnedRepos />}
        {isOverview && (
          <div className='border border-light rounded-2 p-4'>
            <ContributionGraph username="larrikin-coder" />
          </div>
        )}


</div>


      </div>
    </div>
  );
};

export default Hero;
