
/**
 * Configuration for the Tomcat server connection
 */
const TomcatConfig = {
  // Base URL for the Tomcat server - change this to match your Tomcat deployment
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'http://your-tomcat-production-server.com/wedding-vendor'
    : 'http://localhost:8080/wedding-vendor',
  
  // API version
  apiVersion: 'api',
  
  // Timeout in milliseconds
  timeout: 30000,
  
  // Default headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Whether to use mock data as fallback when server is unavailable
  useMockFallback: true
};

export default TomcatConfig;
