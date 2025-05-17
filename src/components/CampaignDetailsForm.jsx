import React, { useState, useEffect } from 'react';

// Function to generate a random alphanumeric string of specified length
const generateCampaignId = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
};

const CampaignDetailsForm = ({ onNext, initialData = {}, onChange = () => {} }) => {
  const [formData, setFormData] = useState({
    campaignId: initialData.campaignId || '',
    domain: initialData.domain || '',
    audienceModel: initialData.audienceModel || '',
    email: initialData.email || '',
    description: initialData.description || ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Simulate API call
        console.log('Submitting form data:', formData);
        
        // In a real application, you would call your API here
        // const response = await fetch('/api/campaigns', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        
        // Simulate API call delay
        setTimeout(() => {
          // Pass the form data to parent component and move to next tab
          onNext(formData);
        }, 500);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="campaign-details-form">
      <form onSubmit={handleSubmit}>
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
