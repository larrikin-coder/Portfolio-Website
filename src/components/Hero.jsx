import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PinnedRepos from './PinnedRepo';
import ContributionGraph from './ContributionsGraph';
import Repolist from './Repolist';
import Resume from './Resume';

const Hero = ({activePath,setActivePath}) => {
  // const location = useLocation();
  const [markdownContent, setMarkdownContent] = useState('');

  // // Map route to file
  // const pathMap = {
  //   '/overview': '/markdown/about.md',
  //   '/projects': '/markdown/projects.md',
  // };
  useEffect(() => {
    fetch(activePath)
      .then((res) => res.text())
      .then(setMarkdownContent)
      .catch(() => setMarkdownContent('# Error loading content'));
  }, [activePath]);

  // const activePath = pathMap[location.pathname] || '/markdown/about.md';
  const isOverview = activePath.includes('about.md');
  const isRepositories = activePath.includes('projects.md');
  const isTechStack = activePath.includes('techstack.md');

  console.log('Active Path:', activePath);
  console.log('Is Overview:', isOverview);
  console.log('Is Repositories:', isRepositories);

  

  useEffect(() => {
    fetch(activePath)
      .then((res) => res.text())
      .then(setMarkdownContent)
      .catch(() => setMarkdownContent('# Error loading content'));
  }, [activePath]);

  return (
    <div className="container-fluid m-0 p-0 text-light min-vh-100">
      <div className="row g-0 flex-column flex-md-row ps-5 pe-5">
        {/* Profile Section */}
        <div className="col-12 col-md-4 mt-2 m-0 p-4 ps-5 pe-5 d-flex flex-column align-items-justify text-start">
          <img
            src="assets/VagabondPFP.png"
            alt="Profile"
            className="rounded-circle mb-3"
            width="300"
            height="300"
          />
          <h3 className="text-start">Shaurya Thapliyal</h3>
          <div className="fs-5 fw-light text-body-primary">larrikin-coder [he/him]</div>
          <div className="mt-2 fs-6 fw-bold text-body-primary">Schrödinger's cat was dead! Curiosity was the culprit.</div>
          <button className="btn buttoff btn-dark border border-dark text-align-center fs-6 fw-medium mt-4" type="button">Edit profile</button>
          <div className="pt-4"><img src="assets/icons8-location-48.png" className="me-1" height="16px" width="16px" alt="Location" />Earth</div>
          <div className="pt-1"><img src="assets/icons8-linkedin-30.png" className="me-1" height="16px" width="16px" alt="LinkedIn" /><a href="https://www.linkedin.com/in/shaurya-thapliyal/">LinkedIn</a></div>
          <div className="pt-1"><img src="assets/icons8-instagram-50.png" className="me-1" height="16px" width="16px" alt="Instagram" /><a href="">Instagram</a></div>
          <div className="pt-1"><img src="assets/icons8-chain-48.png" className="me-1" height="16px" width="16px" alt="HuggingFace" /><a href="https://huggingface.co/larrikin-coder">Huggingface</a></div>
          <hr className="border-top border-light opacity-50 mt-4 mb-2" />
          <h5 className="mt-3">Achievements</h5>
          <div><img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" height="64px" width="64px" alt="Achievement badge" /></div>
        </div>

        {/* Markdown Content Section */}
        <div className="col-12 col-md-8 p-4 pe-5 overflow-auto mt-2">
        {(isOverview ) && (
          <div className="p-4 rounded-2 border border-secondary" style={{ overflowX: "auto" }}>
            <div className="markdown-body" style={{ padding: "2rem" }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <>
          {isOverview && <PinnedRepos />}
          {isRepositories && <Repolist />}
          {isTechStack && <Resume file="/assets/resume.pdf"/>}
          {isOverview && (
            <div className="border border-light rounded-2 p-4 mt-3">
              <ContributionGraph username="larrikin-coder" />
            </div>
          )}
        </>
      </div>

      </div>

    </div>
  );
};

export default Hero;
