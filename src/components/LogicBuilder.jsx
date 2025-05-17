import React, { useState } from 'react';

const LogicBuilder = ({ onNext, campaignDetails, initialData = {}, onChange = () => {} }) => {
  const [selectedRules, setSelectedRules] = useState({
    age: initialData.age || false,
    gender: initialData.gender || false,
    location: initialData.location || false,
    frequency: initialData.frequency || false,
    basket: initialData.basket || false,
    category: initialData.category || false
  });
  const [loading, setLoading] = useState(false);
  
  const handleRuleChange = (e) => {
    const { id, checked } = e.target;
    const ruleName = id.split('-')[0]; // Extract the rule name from the id
    
    const updatedRules = {
      ...selectedRules,
      [ruleName]: checked
    };
    
    setSelectedRules(updatedRules);
    
    // Update parent component state in real-time
    onChange({ [ruleName]: checked });
  };
  
  const handleNext = () => {
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      // Pass all selected rules to the next step
      onNext({ 
        ...selectedRules,
        rules: "Custom logic rules" 
      });
    }, 500);
  };
  
  return (
    <div className="logic-builder">
      <h2>Build Campaign Logic</h2>
      
      <div className="logic-section">
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
        
        <p>Build targeting rules for your campaign using the tools below</p>
        
        <div className="logic-builder-ui">
          <div className="rule-section">
            <h4>Demographic Filters</h4>
            <div className="rule-options">
              <div className="rule-option">
                <input 
                  type="checkbox" 
                  id="age-filter" 
                  checked={selectedRules.age}
                  onChange={handleRuleChange}
                />
                <label htmlFor="age-filter">Age Range</label>
              </div>
              <div className="rule-option">
                <input 
                  type="checkbox" 
                  id="gender-filter" 
                  checked={selectedRules.gender}
                  onChange={handleRuleChange}
                />
                <label htmlFor="gender-filter">Gender</label>
              </div>
              <div className="rule-option">
                <input 
                  type="checkbox" 
                  id="location-filter" 
                  checked={selectedRules.location}
                  onChange={handleRuleChange}
                />
                <label htmlFor="location-filter">Location</label>
              </div>
            </div>
          </div>
          
          <div className="rule-section">
            <h4>Shopping Behavior</h4>
            <div className="rule-options">
              <div className="rule-option">
                <input 
                  type="checkbox" 
                  id="frequency-filter" 
                  checked={selectedRules.frequency}
                  onChange={handleRuleChange}
                />
                <label htmlFor="frequency-filter">Shopping Frequency</label>
              </div>
              <div className="rule-option">
                <input 
                  type="checkbox" 
                  id="basket-filter" 
                  checked={selectedRules.basket}
                  onChange={handleRuleChange}
                />
                <label htmlFor="basket-filter">Basket Size</label>
              </div>
              <div className="rule-option">
                <input 
                  type="checkbox" 
                  id="category-filter" 
                  checked={selectedRules.category}
                  onChange={handleRuleChange}
                />
                <label htmlFor="category-filter">Category Preference</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          className="primary-button" 
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Continue to Schedule'}
        </button>
      </div>
    </div>
  );
};

export default LogicBuilder;
