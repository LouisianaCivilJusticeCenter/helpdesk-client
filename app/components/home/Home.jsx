import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar.jsx';


const Home = () => {
  const flows = [
    { flow: 'I need help with a DIVORCE', link: '/divorce' },
    { flow: 'I need help with CUSTODY/VISITATION', link: '/custody' },
    { flow: 'I need help with a CHILD SUPPORT', link: '/child-support' },
    { flow: 'I, or one of my children, DOMESTIC ABUSE', link: '/abuse' },
    { flow: 'I need help with a INTER-FAMILY ADOPTION', link: '/adoption' },
  ];
  return (
    <div>
      <h2>WELCOME TO THE LOUISIANA CIVIL JUSTICE CENTER ONLINE LEGAL KIOSK in [Webster/Iberia/Concordia]</h2>
      <p>
        The Louisiana Civil Justice Center is a 501c3 non-profit organization that provides free legal information, advice, documents, and referrals.
        This legal kiosk is designed allow self-represented litigants to access family law assistance remotely through their local library.
        Through our online intake and chat portal, you may access legal information and documents free of your charge.
        Family law issues may include custody/visitation, child support, tutorship, domestic abuse, inter-family adoption, and divorce.
        To continue, please select one of the options below.
        If you need assistance with a civil legal issue that is not related to family law, or ifyou are not sure what kind of legal issue you have, please call our hotline at 1-800-310-7029
      </p>
      <ul>
        {flows.map((item, index) => (
          <li key={index} >
            <Link to={item.link}>{item.flow}</Link>
          </li>
        ))}
      </ul>
      <Sidebar />
    </div>
  );
};

export default Home;
