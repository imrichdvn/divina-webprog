import axios from 'axios';
import constants from '../constants';
import { getAuth } from '../utils/auth';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

const getProtectedConfig = () => {
  const { token } = getAuth();
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const fetchArticles = (options = {}) =>
  API.get('/', { params: options.all ? { all: 'true' } : {} });

export const createArticle = (article) => API.post('/', article, getProtectedConfig());

export const updateArticle = (id, article) => API.put(`/${id}`, article, getProtectedConfig());

export const deleteArticle = (id) => API.delete(`/${id}`, getProtectedConfig());
