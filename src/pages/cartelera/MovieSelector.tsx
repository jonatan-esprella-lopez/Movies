import React from 'react';
import type { Movie } from '../App';

interface MovieSelectorProps {
  movies: Movie[];
  selectedMovie: Movie | null;
  selectedTime: string;
  onMovieSelect: (movie: Movie) => void;
  onTimeSelect: (time: string) => void;
}

function MovieSelector({
  movies,
  selectedMovie,
  selectedTime,
  onMovieSelect,
  onTimeSelect,
}: MovieSelectorProps) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
        >
          <img src={movie.image} alt={movie.title} className="movie-image" />
          <div className="movie-content">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-price">${movie.price.toFixed(2)} per ticket</p>
            
            <button
              onClick={() => onMovieSelect(movie)}
              className={`btn btn-full ${
                selectedMovie?.id === movie.id ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              Select Movie
            </button>

            {selectedMovie?.id === movie.id && (
              <div className="movie-times">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Clock className="icon" /> */}
                  <span className="text-sm">Available Times</span>
                </div>
                <div className="time-grid">
                  {movie.times.map((time) => (
                    <button
                      key={time}
                      onClick={() => onTimeSelect(time)}
                      className={`btn ${
                        selectedTime === time ? 'btn-primary' : 'btn-secondary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieSelector;
