import axios from 'axios';
import { useState } from 'react';

const VIDHIDE_API_URL = 'https://vidhideapi.com/api';
const API_KEY = '33315mpkvw1238ybhixwk'; 

interface Movie {
  title: string;
  description: string;
  genre: string;
  release_date: string;
}

export const Pelicula = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]); 

  const searchMovies = async () => {
    try {
      const response = await axios.get(`${VIDHIDE_API_URL}/search`, {
        params: {
          q: query,
          key: API_KEY
        }
      });
      setMovies(response.data.results); 
    } catch (error) {
      console.error('Error al buscar películas:', error);
    }
  };

  return (
    <div>
      <h1>Buscar Películas</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ingresa el nombre de la película"
      />
      <button onClick={searchMovies}>Buscar</button>
      
   
      <div>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p><strong>Género:</strong> {movie.genre}</p>
                <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </div>
    </div>
  );
};
