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
    description:
      "AI-powered web app to automatically solve handwritten math problems.",
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
    description:
      "A chatbot using LLMs to provide contextual answers.",
    language: "JavaScript",
    link: "https://github.com/larrikin-coder/Saraswati-AI",
  },
];

const PinnedRepos = () => {
  return (
    <div className="bg-[#0d1117] min-h-screen p-8 text-[#c9d1d9]">
      <h2 className="text-2xl mb-4">Pinned</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
        {repos.map((repo, index) => (
          <PinnedRepoCard key={index} {...repo} />
        ))}
      </div>
    </div>
  );
};

export default PinnedRepos;
