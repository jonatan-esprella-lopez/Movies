
import { Link } from 'react-router-dom';
import { HeaderNav } from '../../components/header';
import { imageApi } from '../../services/movie-api';
import { useMovieStore } from '../../stores/movie-store';
import './movie-card.css';

export const MovieView = () => {
    const {
        selectedMovie,
    } = useMovieStore();
    if (!selectedMovie) return null;

    const portada = imageApi(selectedMovie.poster_path);
    
    return (
    <section className="container-main">
        <HeaderNav/>
        <section className='conteiner-details-movie'>
            <article className="poster-section">
                <img 
                src={portada} 
                alt="Citadel: Diana Poster" 
                className="movie-image"
                />
            </article>
            <section className="details-section">
                <h1>Pelicula: {selectedMovie?.title} ({selectedMovie.release_date?.substring(0, 4)})</h1>
                <div className="rating-section">
                    <span className="rating-score">{parseFloat(selectedMovie.vote_average.toFixed(1))}</span>
                    <span className="user-rating">Puntuación de usuarios</span>
                    <button className="vibe-button">¿Cuál es tu vibra?</button>
                </div>
                <div className="movie-info">
                    <strong className='country-movie'>{selectedMovie.origin_country}</strong>
                <p>
                    {selectedMovie.genres?.length > 0 ? selectedMovie.genres.map(genre => genre.name).join(' / ') : 'No genres available'} 
                </p>
                </div>
                <div className="movie-overview">
                    <h2>Vista general</h2>
                    <p>
                        {selectedMovie?.overview}
                    </p>
                </div>
                <p>Creador: <strong>{selectedMovie.production_companies[0].name}</strong> </p>
                <div className="watch-now">
                    <Link to="https://vidhidepro.com/v/5jlv210gxoid">
                        <button className='conteiner-btn-1'>Ver ahora</button>
                    </Link>
                </div>
            </section>
        </section>
    </section>
  );
};
