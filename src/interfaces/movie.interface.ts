export interface Genre {
  id: number;
  name: string;
}
  
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genre_ids: Genre[];
}
