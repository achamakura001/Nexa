import React from 'react';

const ViewCampaigns = () => {
  // This would typically be fetched from an API
  const dummyCampaigns = [
    { 
      id: 1, 
      campaignId: '7f5b80e1-68df-4e9c-b3c4-35a3f2769ac8', 
      name: 'Summer Promotion', 
      status: 'Active', 
      startDate: '2025-06-01', 
      endDate: '2025-08-31' 
    },
    { 
      id: 2, 
      campaignId: 'a2e8f9d6-57c1-42b3-9e0a-5c7b3d8f1e0a', 
      name: 'Fall Sale', 
      status: 'Draft', 
      startDate: '2025-09-15', 
      endDate: '2025-10-15' 
    },
    { 
      id: 3, 
      campaignId: '6b9c4d2a-1e8f-40c5-b7a9-3d6e58f0c42b', 
      name: 'Holiday Campaign', 
      status: 'Planned', 
      startDate: '2025-11-20', 
      endDate: '2025-12-31' 
    },
  ];

  return (
    <div className="view-campaigns">
      <h1>All Campaigns</h1>
      <table className="campaigns-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Campaign ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyCampaigns.map(campaign => (
            <tr key={campaign.id}>
              <td>{campaign.id}</td>
              <td><span className="campaign-id">{campaign.campaignId}</span></td>
              <td>{campaign.name}</td>
              <td>{campaign.status}</td>
              <td>{campaign.startDate}</td>
              <td>{campaign.endDate}</td>
              <td>
                <button className="action-btn edit">Edit</button>
                <button className="action-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCampaigns;
