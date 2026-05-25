import axios from 'axios';
import storage from './storage'; 

const api = axios.create({
  baseURL: 'https://vocaforge-backend.vercel.app/api', 
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await storage.getItem('userToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error reading token:", error);
  }
  return config;
});

export default api;