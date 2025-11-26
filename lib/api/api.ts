import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

export const api = axios.create({
  baseURL: '/api', // Next.js API routes
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
