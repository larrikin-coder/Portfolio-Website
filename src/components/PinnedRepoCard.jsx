import React from "react";

const languageColors = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
};

const PinnedRepoCard = ({ title, description, language, link }) => {
  return (
    <div
      className="card border-secondary text-light w-100"
      style={{ cursor: "pointer", minHeight: "140px",backgroundColor: "#0d1117" }}
    >
      <div className="card-body d-flex flex-column">
        <div className="mb-2 d-flex align-items-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title h7 text-primary mb-0 text-decoration-none"
          >
            📦 {title}
          </a>
          <span className="badge bg-secondary ms-2">Public</span>
        </div>
        <p className="card-text text-secondary flex-grow-1">{description}</p>
        <div className="d-flex align-items-center mt-auto">
          <span
            className="rounded-circle me-2"
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: languageColors[language] || "#ccc",
            }}
          ></span>
          <small>{language}</small>
        </div>
      </div>
    </div>
  );
};

export default PinnedRepoCard;