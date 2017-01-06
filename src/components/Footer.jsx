import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="container">
    <div className="row">
      <Link to="http://laciviljustice.org" target="_blank">
        <img src="http://laciviljustice.org/wp-content/uploads/2015/04/lcjc-logo_red-on-white-trimmed.png" alt="LCJC lcjc-logo_red-on-white-trimmed" />
      </Link>
    </div>
  </footer>
);

export default Footer;
