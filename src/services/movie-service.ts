import { Movie } from "../interfaces/movie.interface";
import { SingleMovieDetails } from "../interfaces/single-movie-details";
import type { Cast, GetCreditsResponse } from "../interfaces/get-credits-response";
import { moviesApi } from "./movie-api";

const getMovies = async (filters: Record<string, string | number> = {}, searchKey: string = ""): Promise <Movie[]> => {
  const endpoint = searchKey ? "search/movie" : "discover/movie";
  const response = await moviesApi.get(`/${endpoint}`, {
    params: {
      sort_by: "popularity",
      ...filters,
      query: searchKey || undefined,
    },
  });
  return response.data.results;
};

export const getAllMovies = () => getMovies();
export const getMoviesMostValued = () => getMovies({ "vote_average.gte": 5 });
export const getMoviesLessValued = () => getMovies({ "vote_average.lte": 5 });
export const getMoviesSearch = (searchKey: string) => getMovies({}, searchKey);

export const getMovieDetails = async (movieId: number): Promise <SingleMovieDetails[]> => {
  try {
    const response = await moviesApi.get(`/movie/${movieId}`,
      {
        params: {
          language: "es-MX",
        }
      }
    )
    return response.data
  } catch (error: any) { 
    if (error.response && error.response.status === 404) {
      console.error("Error 404: La película no fue encontrada.");
    } else {
      console.error("Error al obtener los detalles de la película:", error.message);
    }
    return [];
  }
}

export const fetchTrailer = async (movieId: number) => {
  const movieData = await fetchMovie(movieId);
  if (movieData && movieData.key) {
    return { key: movieData.key };
  } else {
    return null;
  }
};

export const fetchMovie = async (id: number): Promise<any> => {
  const { data } = await moviesApi.get(`/movie/${id}`, {
    params: {
      append_to_response: "videos",
      language: "es-ES",
    },
  });

  if (data.videos && data.videos.results) {
    const trailer = data.videos.results.find((vid: any) => vid.name === "Oficial Trailer");
    return trailer ? trailer : data.videos.results[0];
  }
  return null;
};




export const fetchMovieDetailsById = async (movieId: number) => {

  try {
    const response = await moviesApi.get(`/movie/${movieId}`, {
      params: {
        language: "es-ES",
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error);
  }
};


export const fetchActorsMovie = async(movieId: number): Promise <Cast[]> => {
  try {
    const {data} = await moviesApi.get<GetCreditsResponse>(`/movie/${movieId}/credits`,{
      params: {
        lenguage: "es-ES",
      }
    })
    return data.cast;
  } catch (error) {
    console.log("Error al obtener la informacion de los actores", error)
    return []
  }
}