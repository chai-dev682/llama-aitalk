import api from '../axios';

export const chatAPI = {
  generate: (data: any) => api.post('/generate', data),
  getMessages: () => api.get('/api/v1/chats'),
  getMessage: (chat_id: number) => api.get(`/api/v1/chats/${chat_id}`),
  deleteMessage: (chat_id: number) => api.delete(`/api/v1/chats/${chat_id}`),
  updateTitle: (chat_id: number, title: string) => api.patch(`/api/v1/chats/${chat_id}/title`, { title })
};
