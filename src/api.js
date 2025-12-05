import axios from "axios";

// 1. LOCAL URL (Uncomment for testing)
// const BASE_URL = "http://0.0.0.0:8080";

// 2. PRODUCTION URL (Uncomment for deployment)
const BASE_URL = "https://mdm-backend-tr9s.onrender.com";


// --- API Functions ---

export const fetchDeviceData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/heartbeat/latest`);
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

// GET Settings
export const fetchConfig = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/config`);
    return response.data;
  } catch (error) {
    console.error("Error fetching config:", error);
    throw error;
  }
};

// SAVE Settings
export const updateConfig = async (configData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/config`, configData);
    return response.data;
  } catch (error) {
    console.error("Error updating config:", error);
    throw error;
  }
};