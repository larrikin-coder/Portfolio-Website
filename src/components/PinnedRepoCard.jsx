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
            <svg className="icons me-1"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg> {title}
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