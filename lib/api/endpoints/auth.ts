import api from '../axios';

export const authAPI = {
  register: (data: any) => api.post('/api/v1/users/register', data)
};