import React, { useState } from 'react';
import Tab from './Tab';
import TabContent from './TabContent';

const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Campaign Details',
    'Logic Builder',
    'Schedule',
    'Summary'
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <TabContent tabName="Campaign Details" />;
      case 1:
        return <TabContent tabName="Logic Builder" />;
      case 2:
        return <TabContent tabName="Schedule" />;
      case 3:
        return <TabContent tabName="Summary" />;
      default:
        return null;
    }
  };

  return (
    <div className="campaign-builder">
      <h1>Create Campaign</h1>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabbedInterface;
