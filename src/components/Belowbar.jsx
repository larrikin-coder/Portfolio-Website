const belowBar=({setActivePath}) => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-light"
                onClick={() => setActivePath('/markdown/about.md')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-light"
                onClick={() => setActivePath('/markdown/projects.md')}
              >
                Repositories
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-light"
                onClick={() => setActivePath('/markdown/techstack.md')}
              >
                Packages
              </button>
            </li>
          </ul>
            </div>
        </div>
        </nav>
    );
}

export default belowBar;