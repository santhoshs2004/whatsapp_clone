import api from './axios';

export const createConversation = (data) => api.post('/conversations', data);
export const getUserConversations = (userId) => api.get(`/conversations/${userId}`);
export const getConversation = (id) => api.get(`/conversations/${id}`);
