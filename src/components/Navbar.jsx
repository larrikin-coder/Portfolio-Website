import React from 'react';
 


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg top-bar" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand navFS align-items-center" href="#"><img className='d-inline-block align-text-auto me-4' src="/assets/github-icon.png" alt="" width='32px' height="32px" />larrikin-coder</a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* <button className='btn'><img src='/assets/icons8-download-48.png' alt="img" className="d-inline-block align-text-top" height='32px' width='32px'/></button> */}
        </div>
      </div>
      <form class="d-flex me-5" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
