import React from 'react';

const TabContent = ({ tabName }) => {
  return (
    <div>
      <h2>{tabName}</h2>
      <p>Content for {tabName} will go here.</p>
    </div>
  );
};

export default TabContent;
