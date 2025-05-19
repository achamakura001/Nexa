/**
 * API utility functions for making fetch requests to the backend
 */

// Direct API URL since CORS is now enabled on the backend
const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Creates default headers
 */
const getDefaultHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

/**
 * Makes a POST request to the API with proper CORS configuration
 * @param {string} endpoint - The API endpoint to call (without base URL)
 * @param {object} data - The request payload
 * @returns {Promise} - Promise with the response data
 */
/**
 * Makes a POST request to the API
 * @param {string} endpoint - The API endpoint to call (without base URL)
 * @param {object} data - The request payload
 * @returns {Promise} - Promise with the response data
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw { 
        status: response.status, 
        data: responseData 
      };
    }
    
    return responseData;
  } catch (error) {
    if (error.status) {
      // This is an error from the server with a status code
      throw error;
    } else {
      // This is a network error or other exception
      throw { 
        status: 0, 
        data: { detail: error.message || 'Network error' } 
      };
    }
  }
};

/**
 * Makes a GET request to the API with proper CORS configuration
 * @param {string} endpoint - The API endpoint to call (without base URL)
 * @returns {Promise} - Promise with the response data
 */
/**
 * Makes a GET request to the API
 * @param {string} endpoint - The API endpoint to call (without base URL)
 * @returns {Promise} - Promise with the response data
 */
export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getDefaultHeaders(),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw { 
        status: response.status, 
        data 
      };
    }
    
    return data;
  } catch (error) {
    if (error.status) {
      // This is an error from the server with a status code
      throw error;
    } else {
      // This is a network error or other exception
      throw { 
        status: 0, 
        data: { detail: error.message || 'Network error' } 
      };
    }
  }
};
