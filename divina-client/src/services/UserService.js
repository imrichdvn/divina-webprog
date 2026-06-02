import axios from 'axios';
import constants from '../constants';
import { getAuth } from '../utils/auth';

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

const getProtectedConfig = () => {
  const { token } = getAuth();
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const fetchUsers = () => API.get('/', getProtectedConfig());

export const createUser = (user) => API.post('/', user, getProtectedConfig());

export const updateUser = (id, user) => API.put(`/${id}`, user, getProtectedConfig());

export const deleteUser = (id) => API.delete(`/${id}`, getProtectedConfig());

export const loginUser = (credentials) => API.post('/login', credentials);
