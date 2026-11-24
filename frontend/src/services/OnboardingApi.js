
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const submitOnboarding = async (data) => {
  const response = await api.post('/onboarding', data);
  return response.data;
};

export const fetchOnboardings = async () => {
  const response = await api.get('/onboarding');
  return response.data;
};

export const fetchOnboardingById = async (id) => {
  const response = await api.get(`/onboarding/${id}`);
  return response.data;
};

export default api;