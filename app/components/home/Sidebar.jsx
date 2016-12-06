import React from 'react';

const Sidebar = () => {
  const resources = [
    { title: 'Parish Clerk of Court', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'Parish DV Resources', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'Parish Criminal Resources', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'Parish Consumer Resources', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'Parish Legal Aid Office', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'Parish Court Rules', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'Bar Association', link: 'https://www.google.com', contentSnippet: 'place description here' },
    { title: 'WestLaw, Lexis/nexis', link: 'https://www.google.com', contentSnippet: 'place description here' },
  ];
  return (
    <div>
      <ul>
        {resources.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.title}</a>
            <span dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
