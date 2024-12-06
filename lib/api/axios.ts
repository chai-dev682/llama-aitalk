import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();
        const response = await axios.post('/api/v1/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${session?.refreshToken}`
          }
        });

        const { access_token } = response.data;

        await fetch('/api/auth/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token }),
        });

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
      } catch (error) {
        await signOut();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;