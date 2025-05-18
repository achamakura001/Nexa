import React, { useState } from 'react';

const Summary = ({ campaignData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };
  
  if (submitted) {
    return (
      <div className="summary-success">
        <span className="material-icons-outlined" style={{ fontSize: '48px' }}>check_circle</span>
        <h2>Campaign Successfully Created!</h2>
        <p>Your campaign has been scheduled and will start on the selected date.</p>
        <div className="form-actions">
          <button className="primary-button" onClick={() => window.location.href = '/view-campaigns'}>
            View All Campaigns
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="campaign-summary">
      <h2>Campaign Summary</h2>
      <p>Review your campaign details before finalizing</p>
      
      <div className="summary-section">
        <h3>Campaign Details</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Campaign ID:</span>
            <span className="summary-value campaign-id">{campaignData.details?.campaignId || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Domain:</span>
            <span className="summary-value">{campaignData.details?.domain || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Audience Model:</span>
            <span className="summary-value">{campaignData.details?.audienceModel || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Email:</span>
            <span className="summary-value">{campaignData.details?.email || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Description:</span>
            <span className="summary-value">{campaignData.details?.description || 'Not specified'}</span>
          </div>
        </div>
      </div>
      
      <div className="summary-section">
        <h3>Campaign Logic</h3>
        <div className="summary-content">
          <p>Custom targeting logic has been applied to this campaign.</p>
        </div>
      </div>
      
      <div className="summary-section">
        <h3>Schedule</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Start Date:</span>
            <span className="summary-value">{campaignData.schedule?.startDate || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">End Date:</span>
            <span className="summary-value">{campaignData.schedule?.endDate || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Recurrence:</span>
            <span className="summary-value">{campaignData.schedule?.recurrence === 'none' ? 'Run Once' : campaignData.schedule?.recurrence || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Execution Time:</span>
            <span className="summary-value">{campaignData.schedule?.time || 'Not specified'}</span>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          className="primary-button" 
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Create Campaign'}
        </button>
      </div>
    </div>
  );
};

export default Summary;
