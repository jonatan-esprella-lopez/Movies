import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
export const URL_IMAGE = "https://image.tmdb.org/t/p/original";


export const moviesApi = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export const imageApi = (posterMovie: string): string => {
  return URL_IMAGE + posterMovie;
}



