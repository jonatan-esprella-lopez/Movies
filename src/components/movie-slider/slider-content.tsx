import { useEffect, useState } from "react";

import { useMovieStore } from "../../stores/movie-store";
import { getMoviesMostValued } from "../../services/movie-service";
import { URL_IMAGE } from "../../services/movie-api";

import { ButtonMovie } from "../../pages/home/components/button-movie";
import { SingleMovieDetails } from "../../interfaces/movie.interface";
import { sliderContentProps } from "../../interfaces/common.interfaces";

export const SliderContent = ({ currentIndex }: sliderContentProps ):JSX.Element => {
  const [movies, setMovies] = useState<SingleMovieDetails[]>([]);
  const {
    setSelectedMovie
  } = useMovieStore();

  useEffect(() => {
    getMoviesMostValued().then((movies) =>{
      setMovies(movies)
      setSelectedMovie(movies[currentIndex])
    }).catch((error) => {
      console.error('Error al obtener las películas', error);
    });
  }, [currentIndex]);

  return(
  <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
    {movies.map((movie, index) => (
      <div className="slide" key={index}>
        <img
          src={movie.backdrop_path !== null ? `${URL_IMAGE}${"w1280"}${movie.backdrop_path}` : `${URL_IMAGE}${movie.poster_path}`}
          alt={`Imagen de la película ${movie.title}`}
        />
        <ButtonMovie />
      </div>
    ))}
  </div>
  );
}
