import React from 'react';

const ViewCampaigns = () => {
  // This would typically be fetched from an API
  const dummyCampaigns = [
    { id: 1, name: 'Summer Promotion', status: 'Active', startDate: '2025-06-01', endDate: '2025-08-31' },
    { id: 2, name: 'Fall Sale', status: 'Draft', startDate: '2025-09-15', endDate: '2025-10-15' },
    { id: 3, name: 'Holiday Campaign', status: 'Planned', startDate: '2025-11-20', endDate: '2025-12-31' },
  ];

  return (
    <div className="view-campaigns">
      <h1>All Campaigns</h1>
      <table className="campaigns-table">
        <thead>
          <tr>
            <th>ID</th>
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
