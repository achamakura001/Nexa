import React, { useState } from 'react';

const Schedule = ({ onNext, campaignDetails, initialData = {}, onChange = () => {} }) => {
  const [formData, setFormData] = useState({
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    recurrence: initialData.recurrence || 'none',
    time: initialData.time || '09:00'
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedData);
    
    // Update parent component state in real-time
    onChange({ [name]: value });
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      setTimeout(() => {
        onNext(formData);
      }, 500);
    }
  };
  
  return (
    <div className="schedule-form">
      <h2>Campaign Schedule</h2>
      
      <div className="campaign-info">
        <div className="info-item">
          <label>Campaign ID:</label>
          <span className="campaign-id">{campaignDetails?.campaignId || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Domain:</label>
          <span>{campaignDetails?.domain || 'N/A'}</span>
        </div>
      </div>
      
      <p>Set the time frame for your campaign</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date <span className="required">*</span></label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && <div className="error-message">{errors.startDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date <span className="required">*</span></label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <div className="error-message">{errors.endDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="recurrence">Recurrence</label>
          <select
            id="recurrence"
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
          >
            <option value="none">None (Run Once)</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Execution Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="primary-button">
            Continue to Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule;
