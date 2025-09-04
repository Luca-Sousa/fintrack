import axios from 'axios';

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/local-storage';

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
});

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  if (!accessToken) return request;

  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

protectedApi.interceptors.response.use(
  (response) => {
    response;
  },
  async (error) => {
    const request = error.config;
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
    if (!refreshToken) return Promise.reject(error);

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true;

      try {
        const response = await protectedApi.post('/users/refresh-token', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, newRefreshToken);

        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return protectedApi(request);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
        console.error('Error refreshing access token:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);
