import React, { useState } from 'react';

const LogicBuilder = ({ onNext, campaignDetails, initialData = {}, onChange = () => {} }) => {
  const [selectedRules, setSelectedRules] = useState({
    gender: initialData.gender || { value: 'male' },
    frequency: initialData.frequency || false,
    basket: initialData.basket || false,
    category: initialData.category || false
  });
  const [loading, setLoading] = useState(false);
  
  const [apiError, setApiError] = useState(null);
  
  const handleRuleChange = (e) => {
    const { id, checked, value, name } = e.target;
    
    // Handle gender radio buttons
    if (name === 'gender') {
      const updatedGenderRule = {
        value
      };
      
      const updatedRules = {
        ...selectedRules,
        gender: updatedGenderRule
      };
      
      setSelectedRules(updatedRules);
      onChange({ gender: updatedGenderRule });
      return;
    }
    
    // Handle other checkboxes
    const ruleName = id.split('-')[0]; // Extract the rule name from the id
    
    const updatedRules = {
      ...selectedRules,
      [ruleName]: checked
    };
    
    setSelectedRules(updatedRules);
    
    // Update parent component state in real-time
    onChange({ [ruleName]: checked });
  };
  
  const handleNext = async () => {
    setLoading(true);
    setApiError(null);
    
    try {
      // We're just passing the rules to the next step without API call
      // In a real application, you might want to validate or save these rules
      const logicData = {
        ...selectedRules,
        rules: "Custom logic rules"
      };
      
      // Move to the next step
      onNext(logicData);
    } catch (error) {
      console.error('Error processing logic:', error);
      setApiError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="logic-builder">
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '1.5rem',
        color: '#333',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '0.5rem'
      }}>Build Campaign Logic</h2>
      
      {apiError && (
        <div className="api-error-message" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          backgroundColor: '#fff0f0',
          border: '1px solid #ffcccc',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <div className="error-icon" style={{ marginRight: '10px' }}>⚠️</div>
          <div className="error-content" style={{ color: '#d32f2f' }}>{apiError}</div>
        </div>
      )}
      
      <div className="logic-section">
        <div className="campaign-info" style={{
          backgroundColor: '#f9f9f9',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div className="info-item" style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Campaign ID:</label>
            <span className="campaign-id" style={{ 
              backgroundColor: '#e6f2ff', 
              padding: '2px 8px', 
              borderRadius: '4px',
              color: '#007bff',
              fontFamily: 'monospace'
            }}>{campaignDetails?.campaignId || 'N/A'}</span>
          </div>
          <div className="info-item" style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Domain:</label>
            <span style={{ 
              backgroundColor: '#f0f7ff',
              padding: '2px 8px',
              borderRadius: '4px',
              color: '#0066cc'
            }}>{campaignDetails?.domain || 'N/A'}</span>
          </div>
        </div>
        
        
        <div className="logic-builder-ui">
          <div className="rule-section" style={{ marginBottom: '2rem' }}>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#333',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '18px', 
                backgroundColor: '#007bff',
                marginRight: '8px',
                borderRadius: '2px'
              }}></span>
              Demographic Filters
            </h4>
            <div className="rule-options">
              {/* Gender Radio Buttons */}
              <div className="rule-option" style={{ 
                width: '100%', 
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '1rem',
                  fontSize: '15px',
                  fontWeight: 'bold' 
                }}>
                  Gender
                </label>
                <div className="gender-radio-group" style={{ display: 'flex', gap: '2rem' }}>
                  <div className="gender-radio" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: selectedRules.gender.value === 'male' ? '#e6f2ff' : 'transparent',
                    border: selectedRules.gender.value === 'male' ? '1px solid #007bff' : '1px solid #e0e0e0'
                  }}>
                    <input 
                      type="radio" 
                      id="gender-male" 
                      name="gender"
                      value="male"
                      checked={selectedRules.gender.value === 'male'}
                      onChange={handleRuleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="gender-male">Male</label>
                  </div>
                  <div className="gender-radio" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: selectedRules.gender.value === 'female' ? '#e6f2ff' : 'transparent',
                    border: selectedRules.gender.value === 'female' ? '1px solid #007bff' : '1px solid #e0e0e0'
                  }}>
                    <input 
                      type="radio" 
                      id="gender-female" 
                      name="gender"
                      value="female"
                      checked={selectedRules.gender.value === 'female'}
                      onChange={handleRuleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="gender-female">Female</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rule-section">
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#333',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '18px', 
                backgroundColor: '#28a745',
                marginRight: '8px',
                borderRadius: '2px'
              }}></span>
              Shopping Behavior
            </h4>
            <div className="rule-options" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="rule-option" style={{ 
                padding: '8px 16px',
                backgroundColor: selectedRules.frequency ? '#f0f7ff' : '#f9f9f9',
                borderRadius: '4px',
                border: selectedRules.frequency ? '1px solid #007bff' : '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input 
                  type="checkbox" 
                  id="frequency-filter" 
                  checked={selectedRules.frequency}
                  onChange={handleRuleChange}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor="frequency-filter" style={{ cursor: 'pointer' }}>Shopping Frequency</label>
              </div>
              <div className="rule-option" style={{ 
                padding: '8px 16px',
                backgroundColor: selectedRules.basket ? '#f0f7ff' : '#f9f9f9', 
                borderRadius: '4px',
                border: selectedRules.basket ? '1px solid #007bff' : '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input 
                  type="checkbox" 
                  id="basket-filter" 
                  checked={selectedRules.basket}
                  onChange={handleRuleChange}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor="basket-filter" style={{ cursor: 'pointer' }}>Basket Size</label>
              </div>
              <div className="rule-option" style={{ 
                padding: '8px 16px',
                backgroundColor: selectedRules.category ? '#f0f7ff' : '#f9f9f9',
                borderRadius: '4px',
                border: selectedRules.category ? '1px solid #007bff' : '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input 
                  type="checkbox" 
                  id="category-filter" 
                  checked={selectedRules.category}
                  onChange={handleRuleChange}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor="category-filter" style={{ cursor: 'pointer' }}>Category Preference</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-actions" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="primary-button" 
          onClick={handleNext}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#cccccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          {loading ? 'Processing...' : 'Continue to Schedule'}
        </button>
      </div>
    </div>
  );
};

export default LogicBuilder;
