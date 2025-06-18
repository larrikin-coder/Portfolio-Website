import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";


const Belowbar = () => {
  const navigate = useNavigate();
  const [repo, setRepos] = useState([]);
  useEffect(() => {
      const fetchRepos = async (username) => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/repos/${username}`);
          const data = await res.json();
          setRepos(data);
        } catch (error) {
          console.error("Failed to fetch repos:", error);
        }
      };
  
      fetchRepos('larrikin-coder'); // Replace with your GitHub username
    }, []);

  return (
    <nav className="navbar navbar-expand-lg top-bar" data-bs-theme="dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light align-items-center" onClick={() => navigate("/")}>
              <svg className='icons me-1'><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path></svg>
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => navigate("/repositories")}>
                <svg className="icons me-1">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                Repositories
                <span class="badge text-bg-dark ms-2">{repo.length}</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => navigate("/techstack")}>
                <svg className="icons me-1">
                <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"></path>
                </svg>
                Packages
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Belowbar;
