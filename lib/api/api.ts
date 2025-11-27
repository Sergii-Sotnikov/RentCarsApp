import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const apiClient = axios.create({
  baseURL: '/api', // Next.js API routes
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});


