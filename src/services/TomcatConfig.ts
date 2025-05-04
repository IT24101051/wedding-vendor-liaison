
/**
 * Configuration for the Java backend server connection
 */
const BackendConfig = {
  // Base URL for the Java server - change this to match your deployment
  baseUrl: process.env.NODE_ENV === 'production' 
    ? '/api' // In production, use relative path for same-origin requests
    : 'http://localhost:8080/api',
  
  // API version
  apiVersion: '',
  
  // Complete API base URL constructed from baseUrl and apiVersion
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:8080/api',
  
  // Timeout in milliseconds
  timeout: 30000,
  
  // Default headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Whether to use mock data as fallback when server is unavailable
  useMockFallback: true,
  
  // Flag to enable more detailed logging
  enableDebugLogs: true
};

export default BackendConfig;
