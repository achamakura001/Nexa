import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import TabbedInterface from './TabbedInterface';
import ViewCampaigns from './ViewCampaigns';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <AdminPanel />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<div className="welcome-screen">
            <h1>Welcome to Nexa Campaign Manager</h1>
            <p>Use the menu on the left to get started.</p>
          </div>} />
          <Route path="/create-campaign" element={<TabbedInterface />} />
          <Route path="/view-campaigns" element={<ViewCampaigns />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
