import React, { useState } from 'react';

const Summary = ({ campaignData, onEditSection }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('Simulating campaign creation (API not ready)');
      console.log('Campaign data:', campaignData);
      
      // Simulate successful submission
      setSubmissionResult({
        campaign_id: campaignData.details?.campaignId,
        message: 'Campaign successfully created and scheduled'
      });
      
      setSubmitted(true);
      setSubmitting(false);
    }, 1500); // Simulate a 1.5 second API call
  };
  
  if (submitted) {
    return (
      <div className="summary-success">
        <span className="material-icons-outlined" style={{ fontSize: '48px' }}>check_circle</span>
        <h2>Campaign Successfully Created!</h2>
        <p>Your campaign has been scheduled and will start on the selected date.</p>
        <p className="campaign-id-success">Campaign ID: <span>{submissionResult?.campaign_id}</span></p>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Campaign Details</h3>
          <button 
            className="edit-button" 
            onClick={() => onEditSection('details')}
            style={{
              padding: '6px 12px',
              backgroundColor: 'transparent',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Edit Details
          </button>
        </div>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Campaign Logic</h3>
          <button 
            className="edit-button" 
            onClick={() => onEditSection('logic')}
            style={{
              padding: '6px 12px',
              backgroundColor: 'transparent',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Edit Logic
          </button>
        </div>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Gender:</span>
            <span className="summary-value">{campaignData.logic?.gender?.value ? campaignData.logic.gender.value.charAt(0).toUpperCase() + campaignData.logic.gender.value.slice(1) : 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Department:</span>
            <span className="summary-value">{campaignData.logic?.department || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Aisle:</span>
            <span className="summary-value">{campaignData.logic?.aisle || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Shelf:</span>
            <span className="summary-value">{campaignData.logic?.shelf || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Brand:</span>
            <span className="summary-value">{campaignData.logic?.brand || 'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">UPC:</span>
            <span className="summary-value">{campaignData.logic?.upc ? `${campaignData.logic.upc} (${campaignData.logic.upcMode === 'inclusion' ? 'Include' : 'Exclude'})` : 'Not specified'}</span>
          </div>
        </div>
      </div>
      
      <div className="summary-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Schedule</h3>
          <button 
            className="edit-button" 
            onClick={() => onEditSection('schedule')}
            style={{
              padding: '6px 12px',
              backgroundColor: 'transparent',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Edit Schedule
          </button>
        </div>
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
          {submitting ? 'Finalizing Campaign...' : 'Create Campaign'}
        </button>
      </div>
    </div>
  );
};

export default Summary;
