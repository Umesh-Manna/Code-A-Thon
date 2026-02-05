// src/Solar_data/services/api.js

import axios from "axios";

// This checks if the app is on Render (VITE_API_URL) or on your computer (localhost)
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default axios.create({
  baseURL: baseURL,
  timeout: 15000,
});