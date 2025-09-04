import axios from 'axios';

import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/local-storage';

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
});

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  if (!accessToken) return request;

  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});
