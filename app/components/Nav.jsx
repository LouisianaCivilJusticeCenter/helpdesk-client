import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Nav = ({ signOut }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">Justice Tours</a>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-left">
          <li><Link to="/">Home</Link></li>
        </ul>
        <ul className="nav navbar-right">
          <li><Link to="/" onClick={signOut}>Sign Out</Link></li>
        </ul>
      </div>

    </div>


  </nav>
);

Nav.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Nav;
