import React, { useEffect, useState } from 'react';

const Repolist = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [language, setLanguage] = useState('All');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchRepos = async (username) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/repos/${username}`);
        const data = await res.json();
        setRepos(data);

        // Extract unique languages for filtering
        const langs = Array.from(
          new Set(data.map((repo) => repo.language).filter(Boolean))
        );
        setLanguages(langs);
      } catch (error) {
        console.error('Failed to fetch repos:', error);
      }
    };

    fetchRepos('larrikin-coder'); // Replace with your GitHub username
  }, []);

  // Filter logic
  const filteredRepos = repos.filter((repo) => {
    const matchSearch = repo.name.toLowerCase().includes(search.toLowerCase());
    const matchType =
      type === 'All' ||
      (type === 'Public' && !repo.private && !repo.fork && !repo.archived) ||
      (type === 'Private' && repo.private) ||
      (type === 'Forks' && repo.fork) ||
      (type === 'Archived' && repo.archived);
    const matchLanguage = language === 'All' || repo.language === language;

    return matchSearch && matchType && matchLanguage;
  });

  return (
    <div className="container">
      {/* Filter Controls */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center border-bottom border-subtle-secondary py-4">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Find a repository..."
          style={{ maxWidth: '515px',backgroundColor:"#0d1117",color:"#c9d1d9",borderColor:"#30363d",borderRadius:"6px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select form-select-sm"
          style={{ maxWidth: '100px',backgroundColor:"#212830",color:"#c9d1d9",borderColor:"#30363d",borderRadius:"6px",fontSize:"14px",fontWeight:"500",textAlign:"center" }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">Type</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Forks">Forks</option>
          <option value="Archived">Archived</option>
        </select>

        <select
          className="form-select form-select-sm"
          style={{ maxWidth: '115px',backgroundColor:"#212830",color:"#c9d1d9",borderColor:"#30363d",borderRadius:"6px",fontSize:"14px",fontWeight:"500" }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="All">Languages</option>
          {languages.map((lang, i) => (
            <option key={i} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button className="btn btn-sm btn-outline-light d-flex justify-items-center align-items-center text-align-center ps-3 pe-3" style={{maxWidth:"",backgroundColor:"#1f6feb ",color:"#c9d1d9",borderColor:"#30363d",borderRadius:"6px",fontSize:"14px",fontWeight:"500"}}>
          <svg className='me-1' width="16" height="16" fill="#c9d1d9" viewBox="0 0 16 16">
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
          </svg>
          New
        </button>
      </div>

      {/* Repo List */}
      {filteredRepos.map((repo, index) => (
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
                  backgroundColor: repo.color || '#ccc',
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
