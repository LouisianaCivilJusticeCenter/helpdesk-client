import React, { PropTypes } from 'react';

const Splash = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

Splash.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Splash;
