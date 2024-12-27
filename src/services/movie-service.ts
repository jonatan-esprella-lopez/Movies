import type { Cast, GetCreditsResponse } from "../interfaces/get-credits-response";
import { SingleMovieDetails } from "../interfaces/single-movie-details";
import { moviesApi } from "./movie-api";

const DEFAULT_LANGUAGE = "es-ES";

const getMovies = async (filters: Record<string, string | number> = {}, searchKey: string = ""): Promise<SingleMovieDetails[]> => {
  const endpoint = searchKey ? "search/movie" : "discover/movie";
  try{
    const response = await moviesApi.get(`/${endpoint}`, {
      params: {
        sort_by: "popularity",
        ...filters,
        query: searchKey || undefined,
      },
    });
    return response.data.results;;
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    return [];
  }
};

export const getAllMovies = (): Promise<SingleMovieDetails[]> => getMovies();
export const getMoviesMostValued = (): Promise<SingleMovieDetails[]> => getMovies({ "vote_average.gte": 5 });
export const getMoviesLessValued = (): Promise<SingleMovieDetails[]> => getMovies({ "vote_average.lte": 5 });
export const getMoviesSearch = (searchKey: string): Promise<SingleMovieDetails[]> => getMovies({}, searchKey);

export const getMovieDetails = async (movieId: number): Promise <SingleMovieDetails | null> => {
  try {
    const response = await moviesApi.get(`/movie/${movieId}`,{
        params: { language: DEFAULT_LANGUAGE},
      });
    return response.data
  } catch (error: any) { 
    if (error.response?.status === 404) {
      console.error("Error 404: La película no fue encontrada.");
    } else {
      console.error("Error al obtener los detalles de la película:", error.message);
    };
    return null;
  }
};

export const fetchTrailer = async (movieId: number): Promise<{ key: string } | null> => {
  const trailer = await fetchMovie(movieId);
  return trailer ? { key: trailer.key } : null;
};



export const fetchMovie = async (id: number): Promise<{ key: string } | null> => {
  try {
    const { data } = await moviesApi.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos",
        language: DEFAULT_LANGUAGE,
      },
    });

    if (data.videos?.results?.length) {
      const trailer = data.videos.results.find((vid: any) => vid.name === "Oficial Trailer");
      return trailer || data.videos.results[0];
    }
  } catch (error) {
    console.error("Error al obtener el trailer de la película:", error);
  }
  return null;
};

export const fetchActorsMovie = async(movieId: number): Promise <Cast[]> => {
  try {
    const {data} = await moviesApi.get<GetCreditsResponse>(`/movie/${movieId}/credits`,{
      params: {
        lenguage: DEFAULT_LANGUAGE,
      }
    })
    return data.cast;
  } catch (error) {
    console.log("Error al obtener la informacion de los actores", error)
    return []
  }
  
}