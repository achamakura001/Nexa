import React, { useState } from 'react';

const LogicBuilder = ({ onNext, campaignDetails, initialData = {}, onChange = () => {} }) => {
  const [selectedRules, setSelectedRules] = useState({
    gender: initialData.gender || { value: 'male' },
    department: initialData.department || '',
    aisle: initialData.aisle || '',
    shelf: initialData.shelf || '',
    brand: initialData.brand || '',
    upc: initialData.upc || '',
    upcMode: initialData.upcMode || 'inclusion'
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  // Mock data for dropdowns - will be replaced with API calls later
  const options = {
    departments: ['Grocery', 'Produce', 'Meat', 'Dairy', 'Bakery', 'Frozen Foods', 'Personal Care', 'Beverages'],
    aisles: ['Canned Goods', 'Cereal', 'Snacks', 'Pasta', 'Condiments', 'Baking', 'Cleaning'],
    shelves: ['Top', 'Middle', 'Bottom', 'End Cap'],
    brands: ['Store Brand', 'Kraft', 'Nestle', 'Pepsi', 'Coca-Cola', 'General Mills', 'Kellogg\'s', 'P&G']
  };
  
  const handleRuleChange = (e) => {
    const { value, name, type } = e.target;
    
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
    
    // Handle UPC mode radio buttons
    if (name === 'upcMode') {
      setSelectedRules({
        ...selectedRules,
        upcMode: value
      });
      onChange({ upcMode: value });
      return;
    }
    
    // Handle dropdown selects and text inputs
    if (type === 'select-one' || type === 'text') {
      setSelectedRules({
        ...selectedRules,
        [name]: value
      });
      onChange({ [name]: value });
      return;
    }
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
              {/* Department dropdown */}
              <div className="rule-option" style={{ 
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold' 
                }}>
                  Department
                </label>
                <select
                  name="department"
                  value={selectedRules.department}
                  onChange={handleRuleChange}
                  style={{ 
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Department</option>
                  {options.departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              
              {/* Aisle dropdown */}
              <div className="rule-option" style={{ 
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold' 
                }}>
                  Aisle
                </label>
                <select
                  name="aisle"
                  value={selectedRules.aisle}
                  onChange={handleRuleChange}
                  style={{ 
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Aisle</option>
                  {options.aisles.map((aisle, index) => (
                    <option key={index} value={aisle}>{aisle}</option>
                  ))}
                </select>
              </div>
              
              {/* Shelf dropdown */}
              <div className="rule-option" style={{ 
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold' 
                }}>
                  Shelf
                </label>
                <select
                  name="shelf"
                  value={selectedRules.shelf}
                  onChange={handleRuleChange}
                  style={{ 
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Shelf</option>
                  {options.shelves.map((shelf, index) => (
                    <option key={index} value={shelf}>{shelf}</option>
                  ))}
                </select>
              </div>
              
              {/* Brand dropdown */}
              <div className="rule-option" style={{ 
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold' 
                }}>
                  Brand
                </label>
                <select
                  name="brand"
                  value={selectedRules.brand}
                  onChange={handleRuleChange}
                  style={{ 
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Brand</option>
                  {options.brands.map((brand, index) => (
                    <option key={index} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* UPC text input with radio buttons */}
              <div className="rule-option" style={{ 
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold' 
                }}>
                  UPC
                </label>
                <input 
                  type="text" 
                  name="upc"
                  value={selectedRules.upc}
                  onChange={handleRuleChange}
                  placeholder="Enter UPC code"
                  style={{ 
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    marginBottom: '10px'
                  }}
                />
                
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <div className="upc-radio" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: selectedRules.upcMode === 'inclusion' ? '#e6f2ff' : 'transparent',
                    border: selectedRules.upcMode === 'inclusion' ? '1px solid #007bff' : '1px solid #e0e0e0'
                  }}>
                    <input 
                      type="radio" 
                      id="upc-inclusion" 
                      name="upcMode"
                      value="inclusion"
                      checked={selectedRules.upcMode === 'inclusion'}
                      onChange={handleRuleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="upc-inclusion">Inclusion</label>
                  </div>
                  <div className="upc-radio" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    backgroundColor: selectedRules.upcMode === 'exclusion' ? '#e6f2ff' : 'transparent',
                    border: selectedRules.upcMode === 'exclusion' ? '1px solid #007bff' : '1px solid #e0e0e0'
                  }}>
                    <input 
                      type="radio" 
                      id="upc-exclusion" 
                      name="upcMode"
                      value="exclusion"
                      checked={selectedRules.upcMode === 'exclusion'}
                      onChange={handleRuleChange}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="upc-exclusion">Exclusion</label>
                  </div>
                </div>
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
