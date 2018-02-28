import React, { PropTypes } from 'react';
import resources from '../resources.js';
import _ from 'underscore';


const Resources = ({ params }) => (
  // TODO: max i got theses collumns mixed up can you fix the css on these
  // sure things bae. Antoine
  <div className="row">
    <div className="col-md-9">
      <div className="row">
        <div className="col-md-8">
          <h3>Legal Resources</h3>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {/* TODO: Its better to make this map in its own component */}
          <h3>{resources[params.parish].parish} Parish</h3>
          {_.map(resources[params.parish].resources, (resource, index) => (
            <div key={resource.title}>
              <h4 key={index} >
                {resource.title}
              </h4>
              <p>{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

Resources.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Resources;
