import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Nav = ({ signOut }) => (
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
        <a className="navbar-brand" href="/">LCJC Virtual Legal Help Desk</a>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-left">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Resources<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/resources/webster">Webster parish</Link></li>
              <li role="separator" className="divider"></li>
              <li><Link to="/resources/iberia">Iberia Parish</Link></li>
              <li role="separator" className="divider"></li>
              <li><Link to="resources/concordia">Concordia parish</Link></li>
              <li role="separator" className="divider"></li>
              <li><Link to="resources/natchitoches">Natchitoches parish</Link></li>
            </ul>
          </li>
        </ul>
        {localStorage.getItem('token') ?
          <ul className="nav navbar-right">
            <li><button type="button" className="btn" onClick={signOut}>Sign Out</button></li>
            {/* <li><Link to={`/chat/${localStorage.getItem('id')}`}>Chat</Link></li> */}
          </ul>
          :
          null
        }

      </div>

    </div>


  </nav>
);

Nav.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Nav;
