
/**
 * Configuration for the Tomcat server connection
 */
const TomcatConfig = {
  // Base URL for the Tomcat server - change this to match your Tomcat deployment
  baseUrl: process.env.NODE_ENV === 'production' 
    ? '/wedding-vendor' // In production, use relative path for same-origin requests
    : 'http://localhost:8080/wedding-vendor',
  
  // API version
  apiVersion: 'api',
  
  // Complete API base URL constructed from baseUrl and apiVersion
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? '/wedding-vendor/api'
    : 'http://localhost:8080/wedding-vendor/api',
  
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

export default TomcatConfig;
