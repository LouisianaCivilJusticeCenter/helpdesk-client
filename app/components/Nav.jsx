import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Nav = ({ signOut }) => (
  <div>
    <ul>
      {localStorage.getItem('user.id') ?
        <div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/" onClick={signOut}>Sign Out</Link></li>
        </div> :
        <div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </div>
      }
    </ul>
  </div>
);

Nav.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Nav;
