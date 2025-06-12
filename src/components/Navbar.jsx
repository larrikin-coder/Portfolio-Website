import React from 'react';
 


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg top-bar" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><span className='me-2'><img className='d-inline-block align-text-auto' src="/assets/github-icon.png" alt="" width='32px' height="32px" /></span>larrikin-coder</a>
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

          <button className='btn'><img src='/assets/icons8-download-48.png' alt="img" className="d-inline-block align-text-top" height='32px' width='32px'/></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
