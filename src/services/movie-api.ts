import { URL_IMAGE } from "@/constants/apimovie";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
export const moviesApi = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export const imageApi = (posterMovie: string, size: string): string => {
  return `${URL_IMAGE}${size}${posterMovie}`;
}

