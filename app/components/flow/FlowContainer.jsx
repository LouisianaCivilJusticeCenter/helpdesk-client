/* eslint max-len: 0 */

import React, { PropTypes } from 'react';
import Flow from '../flow/Flow.jsx';
import flows from '../flows.js';


const FlowContainer = ({ params }) => (
  <div>
    <Flow issue={flows[params.issue]} />
  </div>
);

FlowContainer.propTypes = {
  params: PropTypes.object.isRequired,
};

export default FlowContainer;
