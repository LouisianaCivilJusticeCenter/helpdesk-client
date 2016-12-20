/* eslint max-len: 0 */

import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';


const Home = () => {
  const flows = [
    { flow: 'Divorce', link: 'flow/divorce' },
    { flow: 'Custody/Visitation', link: '/flow/custody' },
    { flow: 'Child Support', link: '/flow/child_support' },
    { flow: 'Domestic Abuse', link: '/flow/dv' },
    { flow: 'Inter-Family Adoption', link: '/flow/adoption' },
  ];
  return (
    <div className="row home">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-7">
            <h3>Welcome to the Louisiana Civil Justice Center's Online Legal Kiosk in [Webster/Iberia/Concordia]</h3>
            <p>
              The Louisiana Civil Justice Center is a 501c3 non-profit organization that provides free legal information, advice, documents, and referrals.
              This legal kiosk is designed allow self-represented litigants to access family law assistance remotely through their local library.
            </p>
            <p>
              Through our online intake and chat portal, you may access legal information and documents <b>free of your charge</b>.
              Family law issues may include custody/visitation, child support, tutorship, domestic abuse, inter-family adoption, and divorce.
              To continue, please select one of the options below.
              If you need assistance with a civil legal issue that is not related to family law, or ifyou are not sure what kind of legal issue you have, please call our hotline at 1-800-310-7029
            </p>
          </div>
          <div className="col-md-5 text-center">
            <h3>What do you need help with?</h3>
            {flows.map((item, index) => (
              <div>
                <Link to={item.link} className="btn btn-default btn-lg btn-block" key={index} >
                  {item.flow}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
