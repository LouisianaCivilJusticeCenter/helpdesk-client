import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import resources from '../resources.js';
import _ from 'underscore';


const Resources = ({ params }) => (
  // TODO: max i got theses collumns mixed up can you fix the css on these
  <div className="row">
    <div className="col-md-9">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <h3 className="text-center">Legal Resources</h3>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      <div className="row">
        <div className="col-md-offset-3 col-md-6 text-center">
          {/* TODO: Its better to make this map in its own component */}
          <h3>{resources[params.parish].parish} Parish</h3>
          {_.map(resources[params.parish].resources, (resource, index) => (
            <div key={resource.title}>
              <Link to={resource.link} className="btn btn-default btn-lg btn-block" key={index} >
                {resource.title}
              </Link>
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
