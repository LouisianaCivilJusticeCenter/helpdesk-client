import React, { PropTypes } from 'react';
import Nav from './Nav.jsx';

const Header = ({ signOut, user }) => (
  <div>
    <Nav signOut={signOut} user={user} />
    <h1>
      Justice Tours
    </h1>
  </div>
);

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.string,
};

export default Header;
