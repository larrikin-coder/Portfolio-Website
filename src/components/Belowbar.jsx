import { useNavigate } from "react-router-dom";

const Belowbar = () => {
  const navigate = useNavigate();

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
              <button className="nav-link btn btn-link text-light" onClick={() => navigate("/")}>
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => navigate("/repositories")}>
                Repositories
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light" onClick={() => navigate("/techstack")}>
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
