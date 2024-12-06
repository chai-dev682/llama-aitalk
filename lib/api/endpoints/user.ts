import api from '../axios';

export const userAPI = {
  getProfile: () => api.get('/api/v1/users/me'),
  updateProfile: (data: any) => api.put('/api/v1/users/me', data),
  // changePassword: (data: any) => api.post('/api/v1/users/change-password', data),
  deleteAccount: () => api.delete('/api/v1/users/me')
};