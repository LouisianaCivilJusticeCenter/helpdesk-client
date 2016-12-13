import React, { PropTypes } from 'react';
import Nav from './Nav.jsx';

const Header = ({ signOut }) => (
  <div>
    <Nav signOut={signOut} />
  </div>
);

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Header;
