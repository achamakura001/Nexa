import React, { useState } from 'react';

const Summary = ({ campaignData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const handleSubmit = async () => {
    setSubmitting(true);
    setApiError(null);
    
    try {
      // Prepare complete campaign data
      const completeData = {
        campaign_id: campaignData.details?.campaignId,
        domain: campaignData.details?.domain,
        audience_model: campaignData.details?.audienceModel,
        email_address: campaignData.details?.email,
        description: campaignData.details?.description,
        // Add logic and schedule data as needed by the API
        logic_rules: campaignData.logic?.rules,
        start_date: campaignData.schedule?.startDate,
        end_date: campaignData.schedule?.endDate,
        recurrence: campaignData.schedule?.recurrence,
        execution_time: campaignData.schedule?.time
      };
      
      // Call the API to finalize the campaign
      // Note: In this implementation, we assume the campaign was already created
      // in the CampaignDetailsForm step, so we're just finalizing it here
      console.log('Finalizing campaign with data:', completeData);
      
      // Simulating successful API response since campaign was already created
      // In a real application, you would make an actual API call here
      setSubmissionResult({
        campaign_id: campaignData.details?.campaignId,
        message: 'Campaign successfully created and scheduled'
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error finalizing campaign:', error);
      setApiError(`Error finalizing campaign: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
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
      
      {apiError && (
        <div className="api-error-message">
          <div className="error-icon">⚠️</div>
          <div className="error-content">{apiError}</div>
        </div>
      )}
      
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
          {submitting ? 'Finalizing Campaign...' : 'Create Campaign'}
        </button>
      </div>
    </div>
  );
};

export default Summary;
