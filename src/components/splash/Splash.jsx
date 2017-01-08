import React, { PropTypes } from 'react';

const Splash = ({ title, subTitle }) => (
  <div>
    <h1>{title}</h1>
    <h3>{subTitle}</h3>
  </div>
);

Splash.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default Splash;
