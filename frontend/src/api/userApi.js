import api from './axios';

export const loginOrRegister = (data) => api.post('/users/login', data);
export const getAllUsers = (excludeId) => api.get(`/users?excludeUserId=${excludeId}`);
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const logoutUser = (id) => api.post(`/users/logout/${id}`);
