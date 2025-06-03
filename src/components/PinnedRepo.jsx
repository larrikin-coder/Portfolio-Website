import React from "react";
import PinnedRepoCard from "./PinnedRepoCard";

const repos = [
  {
    title: "CEXWalletHub",
    description: "Centralized crypto exchange wallet.",
    language: "TypeScript",
    link: "https://github.com/larrikin-coder/CEXWalletHub",
  },
  {
    title: "SmartSolve",
    description: "AI-powered web app to automatically solve handwritten math problems.",
    language: "TypeScript",
    link: "https://github.com/larrikin-coder/SmartSolve",
  },
  {
    title: "Pre-trained-Neural-Recommendation-System",
    description: "Neural-based hybrid recommendation engine.",
    language: "Python",
    link: "https://github.com/larrikin-coder/Pre-trained-Neural-Recommendation-System",
  },
  {
    title: "Saraswati-AI",
    description: "A chatbot using LLMs to provide contextual answers.",
    language: "JavaScript",
    link: "https://github.com/larrikin-coder/Saraswati-AI",
  },
];

const PinnedRepos = () => {
  return (
    <section className="bg-dark text-light py-5">
      <div className="container">
        <div className="d-flex justify-content-end">
          <div style={{ maxWidth: "900px", width: "100%" }}>
            <h5 className="mb-4">Pinned</h5>
            <div className="row g-3">
              {repos.map((repo, index) => (
                <div key={index} className="col-12 col-md-6 d-flex">
                  <PinnedRepoCard {...repo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedRepos;