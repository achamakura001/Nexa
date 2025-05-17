import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Import the logo from assets
import albertsonsLogo from '../assets/images/2-Alb_Vert_RGB.png';

const AdminPanel = () => {
  const location = useLocation();
  
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="logo-container">
          <img 
            src={albertsonsLogo} 
            alt="Albertsons Logo" 
            className="company-logo" 
          />
          <h2>Nexa</h2>
        </div>
      </div>
      <div className="admin-menu">
        <ul>
          <li>
            <Link 
              to="/create-campaign" 
              className={`menu-item ${location.pathname === '/create-campaign' ? 'active' : ''}`}
            >
              <span className="material-icons-outlined" style={{ marginRight: '8px', fontSize: '18px' }}>add_circle</span>
              Create Campaign
            </Link>
          </li>
          <li>
            <Link 
              to="/view-campaigns" 
              className={`menu-item ${location.pathname === '/view-campaigns' ? 'active' : ''}`}
            >
              <span className="material-icons-outlined" style={{ marginRight: '8px', fontSize: '18px' }}>view_list</span>
              View Campaigns
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
