import React, { useState, useEffect } from 'react';
import { postData } from '../utils/api';

// Function to generate a UUID v4 compliant with RFC4122
const generateCampaignId = () => {
  // Create a properly formatted UUID v4
  const hexDigits = '0123456789abcdef';
  let uuid = '';
  
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4'; // Version 4
    } else if (i === 19) {
      uuid += hexDigits[(Math.random() * 4 | 0) + 8]; // Variant bits
    } else {
      uuid += hexDigits[Math.random() * 16 | 0];
    }
  }
  
  return uuid;
};

const CampaignDetailsForm = ({ onNext, initialData = {}, onChange = () => {} }) => {
  const [formData, setFormData] = useState({
    campaignId: initialData.campaignId || '',
    domain: initialData.domain || '',
    audienceModel: initialData.audienceModel || '',
    email: initialData.email || 'hardcoded@ddd.com',
    description: initialData.description || 'Testing campaign description, this is hard coded',
  });

  const [errors, setErrors] = useState({});
  
  // Generate campaign ID on component mount only if there isn't one already
  useEffect(() => {
    if (!formData.campaignId) {
      setFormData(prevState => ({
        ...prevState,
        campaignId: generateCampaignId()
      }));
    }
  }, [formData.campaignId]);

  const domains = ['AMC', 'PZN'];
  const audienceModels = ['Affinity', 'Propensity'];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.domain) {
      newErrors.domain = 'Domain is required';
    }

    if (!formData.audienceModel) {
      newErrors.audienceModel = 'Audience Model is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const [apiError, setApiError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setApiError(null);
        console.log('Submitting form data:', formData);
        
        // Prepare data for API
        const apiData = {
          campaign_id: formData.campaignId,
          domain: formData.domain,
          audience_model: formData.audienceModel,
          email_address: formData.email,
          description: formData.description
        };
        
        console.log('Sending API request with campaign_id:', apiData.campaign_id);
        
        try {
          // Call the API using our utility function
          const data = await postData('/campaigns/', apiData);
          
          console.log('API response:', data);
          
          // Success - update form data with response
          const updatedData = {
            ...formData,
            campaignId: data.campaign_id
          };
          
          // Pass the form data to parent component and move to next tab
          onNext(updatedData);
        } catch (error) {
          console.error('API call failed:', error);
          
          // Handle validation errors
          if (error.status === 422) {
            const errorDetails = error.data.detail?.map(err => 
              `${err.loc.join('.')} - ${err.msg}`
            ).join(', ');
            
            // Handle UUID validation errors specifically
            if (errorDetails.includes('UUID')) {
              console.log('UUID validation error, regenerating UUID and retrying...');
              const newUuid = generateCampaignId();
              console.log('Generated new UUID:', newUuid);
              
              const updatedApiData = {
                ...apiData,
                campaign_id: newUuid
              };
              
              try {
                const retryData = await postData('/campaigns/', updatedApiData);
                console.log('Retry successful with new UUID:', retryData);
                
                const updatedFormData = {
                  ...formData,
                  campaignId: retryData.campaign_id
                };
                
                onNext(updatedFormData);
                return;
              } catch (retryError) {
                console.error('Retry with new UUID also failed:', retryError);
                setApiError(`Retry failed: ${retryError.data?.detail || JSON.stringify(retryError.data)}`);
              }
            } else {
              setApiError(`Validation error: ${errorDetails}`);
            }
          } else if (error.status === 0) {
            setApiError(`Network error: The server may not be running or CORS is not properly configured.`);
          } else {
            setApiError(`API error (${error.status}): ${error.data?.detail || JSON.stringify(error.data) || 'Unknown error'}`);
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setApiError(`Network error: ${error.message}`);
      }
    }
  };

  return (
    <div className="campaign-details-form">
      <form onSubmit={handleSubmit}>
        {apiError && (
          <div className="api-error-message">
            <div className="error-icon">⚠️</div>
            <div className="error-content">{apiError}</div>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="campaignId">Campaign ID</label>
          <input
            type="text"
            id="campaignId"
            name="campaignId"
            value={formData.campaignId}
            readOnly
            className="readonly-field"
          />
          <small className="field-hint">Auto-generated unique identifier</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="domain">Domain <span className="required">*</span></label>
          <select
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className={errors.domain ? 'error' : ''}
          >
            <option value="">Select Domain</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
          {errors.domain && <div className="error-message">{errors.domain}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="audienceModel">Audience Model <span className="required">*</span></label>
          <select
            id="audienceModel"
            name="audienceModel"
            value={formData.audienceModel}
            onChange={handleChange}
            className={errors.audienceModel ? 'error' : ''}
          >
            <option value="">Select Audience Model</option>
            {audienceModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {errors.audienceModel && <div className="error-message">{errors.audienceModel}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description <span className="required">*</span></label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter campaign description..."
            rows="4"
            className={errors.description ? 'error' : ''}
          ></textarea>
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignDetailsForm;
