import React, { useEffect, useState } from 'react';

const Repolist = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async (username) => {
      try {
        const res = await fetch(`/api/repos/${username}`);
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      }
    };

    fetchRepos('larrikin-coder'); // Replace with your GitHub username
  }, []);

  return (
    <div className="container mt-4">
      
      {repos.map((repo, index) => (
        <div
          key={index}
          className="border-bottom border-secondary-subtle py-4 d-flex justify-content-between align-items-start"
        >
          <div>
            <h5 className="text-primary fw-semibold mb-1">
              {repo.name}
              <span className="badge bg-dark text-light ms-2">Public</span>
            </h5>
            <p className="text-light mb-1">{repo.description}</p>
            <div className="text-secondary small d-flex align-items-center">
              <span
                className="me-2"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: repo.color || '#ccc', // fallback if color missing
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              ></span>
              {repo.language} · Updated {repo.updated || 'recently'}
            </div>
          </div>
          <button className="btn btn-sm btn-outline-light mt-1">★ Star</button>
        </div>
      ))}
    </div>
  );
};

export default Repolist;
