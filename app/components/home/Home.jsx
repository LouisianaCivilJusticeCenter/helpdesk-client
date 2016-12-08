/* eslint max-len: 0 */

import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';


const Home = () => {
  const flows = [
    { flow: 'Divorce', link: 'flow/divorce' },
    { flow: 'Custody/Visitation', link: '/custody' },
    { flow: 'Child Support', link: '/child_support' },
    { flow: 'Domestic Abuse', link: '/dv' },
    { flow: 'Inter-Family Adoption', link: 'adoption' },
  ];
  return (
    <div className="row">
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <h2>WELCOME TO THE LOUISIANA CIVIL JUSTICE CENTER ONLINE LEGAL KIOSK in [Webster/Iberia/Concordia]</h2>
            <p>
              The Louisiana Civil Justice Center is a 501c3 non-profit organization that provides free legal information, advice, documents, and referrals.
              This legal kiosk is designed allow self-represented litigants to access family law assistance remotely through their local library.
              Through our online intake and chat portal, you may access legal information and documents free of your charge.
              Family law issues may include custody/visitation, child support, tutorship, domestic abuse, inter-family adoption, and divorce.
              To continue, please select one of the options below.
              If you need assistance with a civil legal issue that is not related to family law, or ifyou are not sure what kind of legal issue you have, please call our hotline at 1-800-310-7029
            </p>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-3 col-md-6 text-center">
            <h3>What do you need help with?</h3>
              {flows.map((item, index) => (
                <button className="btn btn-default btn-lg btn-block" key={index} >
                  <Link to={item.link}>{item.flow}</Link>
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
