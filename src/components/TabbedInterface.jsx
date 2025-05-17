import React, { useState } from 'react';
import Tab from './Tab';
import CampaignDetailsForm from './CampaignDetailsForm';
import LogicBuilder from './LogicBuilder';
import Schedule from './Schedule';
import Summary from './Summary';

const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [campaignData, setCampaignData] = useState({
    details: null,
    logic: null,
    schedule: null
  });

  const tabs = [
    'Campaign Details',
    'Logic Builder',
    'Schedule',
    'Summary'
  ];

  // Function to handle moving to the next tab
  const handleNextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  // Handle form data from Campaign Details with preserving existing data
  const handleCampaignDetailsSubmit = (formData) => {
    setCampaignData({
      ...campaignData,
      details: formData
    });
    handleNextTab();
  };

  // Handle form data from Logic Builder with preserving existing data
  const handleLogicBuilderSubmit = (formData) => {
    setCampaignData({
      ...campaignData,
      logic: formData
    });
    handleNextTab();
  };

  // Handle form data from Schedule with preserving existing data
  const handleScheduleSubmit = (formData) => {
    setCampaignData({
      ...campaignData,
      schedule: formData
    });
    handleNextTab();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <CampaignDetailsForm 
          onNext={handleCampaignDetailsSubmit} 
          initialData={campaignData.details || {}} 
          onChange={(data) => setCampaignData(prev => ({ ...prev, details: { ...prev.details, ...data } }))}
        />;
      case 1:
        return <LogicBuilder 
          onNext={handleLogicBuilderSubmit} 
          campaignDetails={campaignData.details} 
          initialData={campaignData.logic || {}} 
          onChange={(data) => setCampaignData(prev => ({ ...prev, logic: { ...prev.logic, ...data } }))}
        />;
      case 2:
        return <Schedule 
          onNext={handleScheduleSubmit} 
          campaignDetails={campaignData.details} 
          initialData={campaignData.schedule || {}} 
          onChange={(data) => setCampaignData(prev => ({ ...prev, schedule: { ...prev.schedule, ...data } }))}
        />;
      case 3:
        return <Summary campaignData={campaignData} />;
      default:
        return null;
    }
  };

  return (
    <div className="campaign-builder">
      <h1>Create Campaign</h1>
      <div className="tabs">
        {tabs.map((tab, index) => {
          // Determine if this tab is clickable
          const canNavigate = index <= activeTab || 
                             (index === 1 && campaignData.details) || 
                             (index === 2 && campaignData.logic && campaignData.details) || 
                             (index === 3 && campaignData.schedule && campaignData.logic && campaignData.details);
          
          // Determine if this step is completed
          const isCompleted = (index === 0 && campaignData.details) ||
                             (index === 1 && campaignData.logic) ||
                             (index === 2 && campaignData.schedule);
          
          return (
            <Tab
              key={index}
              label={tab}
              isActive={activeTab === index}
              isCompleted={isCompleted}
              disabled={!canNavigate}
              onClick={() => {
                if (canNavigate) {
                  setActiveTab(index);
                }
              }}
            />
          );
        })}
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabbedInterface;
