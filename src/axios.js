import axios from "axios";

// Log the environment variable to verify
console.log("API Base URL:", process.env.REACT_APP_API_URL);

// Set the base URL for Axios from the environment variable
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default axios;