import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Nav = ({ signOut }) => {
  const userId = localStorage.getItem('id');
  const chatLink = `/chat/${userId}`;
  return (
    <nav className="navbar navbar-default">
      <div className="container">
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
          <a className="navbar-brand" href="#">LCJC</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-left">
            <li><Link to="/">Home</Link></li>
          </ul>
          {localStorage.getItem('token') ?
            <ul className="nav navbar-right">
              <li><button type="button" onClick={signOut}>Sign Out</button></li>
              {/* <li><Link to={chatLink}>Chat</Link></li> */}
            </ul>
            :
            <ul className="navbar-right list-inline">
              <li><Link to="/sign-in">Sign In</Link></li>
              <li><Link to="/admin">admin</Link></li>
            </ul>
          }

        </div>

      </div>


    </nav>
  );
};

Nav.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Nav;
