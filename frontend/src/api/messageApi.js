import api from './axios';

export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = (conversationId, page = 1) =>
  api.get(`/messages/${conversationId}?page=${page}`);
export const markAsRead = (conversationId, userId) =>
  api.put(`/messages/read/${conversationId}/${userId}`);
