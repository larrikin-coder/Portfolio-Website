const belowBar=() => {
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
                <a className="nav-link active" aria-current="page" href="#">Overview</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" href="#">Repositories</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" href="#">Projects</a>
                </li>
                {/* <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default belowBar;