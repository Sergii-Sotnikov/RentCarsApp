
import axios from "axios";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

if (!SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
}

export const ServerApi = axios.create({
  baseURL: SITE_URL,
});










