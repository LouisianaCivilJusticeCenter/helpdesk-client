/* eslint max-len: 0 */

import React from 'react';
import { Link } from 'react-router';
import flows from '../flows.js';
import _ from 'underscore';

const Home = () => (
  <div className="row home">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-7">
          <h3>Welcome to the Louisiana Civil Justice Center's Virtual Legal Help Desk</h3>
          <p>
            The Louisiana Civil Justice Center is a 501c3 non-profit organization that provides free legal information, advice, documents, and referrals.
            This Virtual Legal Help Desk is designed allow self-represented litigants to access family law assistance remotely through their local library.
          </p>
          <p>
            Through our online intake and chat portal, you may access legal information and documents <b>free of charge</b>.
            To continue, please select one of the options below.
            If you need assistance with a civil legal issue that is not related to family law, or if you are not sure what kind of legal issue you have, please call our hotline at 1-800-310-7029
          </p>
          <p className="bg-warning">If you have previously chatted online with an attorney please just call our hotline 1-800-310-7029.</p>
        </div>
        <div className="col-md-5 text-center">
          <h3>What do you need help with?</h3>
          {_.map(flows, (item, index) => (
            <div key={item.title}>
              <Link to={`flow/${item.link}`} className="btn btn-default btn-lg btn-block" key={index} >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
