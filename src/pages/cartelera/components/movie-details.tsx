import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies.ts';
import './movie-detail.css';
import { useMovieStore } from '../../../stores/movie-store.ts';
import { DateSelector } from './date-selector.tsx';
import { useState } from 'react';

const MovieDetail = () => {
    const [selectedDate, setSelectedDate] = useState<number>(24);

    const handleDateClick = (time: number) => {
      setSelectedDate(time);
    };
    const {
        selectedMovie
    } = useMovieStore ();
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(id));

  if (!selectedMovie) return <div>Movie not found</div>;

  const showtimes = ['12:30', '15:45', '18:15', '21:00'];
  const genres = ['Action', 'Adventure', 'Sci-Fi'];
  const directors = ['Denis Villeneuve'];
  const cast = ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'];

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <div className="movie-info-section">
          
          
          <div className="movie-meta">
            <div className="meta-item">
              {/* <Clock className="meta-icon" /> */}
              <span>{parseInt(selectedMovie.runtime/60)+"." +selectedMovie.runtime % 60 } Hrs</span>
            </div>
            <div className="meta-item">
              {/* <Film className="meta-icon" /> */}
              <span>{genres.join(', ')}</span>
            </div>
            <div className="meta-item">
              {/* <Globe className="meta-icon" /> */}
              <span>Idioma {selectedMovie.original_language}</span>
            </div>
          </div>

          {/* <div className="movie-synopsis">
            <h2>Descripción</h2>
            <p>{selectedMovie.overview}</p>
          </div> */}

          <DateSelector/>

          {/* <div className="movie-credits">
            <div className="credits-section">
              <h3>Director</h3>
              <p>{directors.join(', ')}</p>
            </div>
            <div className="credits-section">
              <h3>Cast</h3>
              <p>{cast.join(', ')}</p>
            </div>
          </div> */}

          <div className="showtimes-section">
            <h2>
              {/* <Calendar className="section-icon" /> */}
              Horarios de (Fecha seleccionada)
            </h2>
            <div className="showtimes-grid">
              {showtimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleDateClick(time)}
                //   onClick={() => navigate(`/seats/${selectedMovie.id}?time=${time}`)}
                  className="showtime-button"
                >
                  {/* <Clock className="time-icon" /> */}
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="ticket-info">
            <div className="info-card">
              {/* <Ticket className="info-icon" /> */}
              <div className="info-text">
                <h4>Sala General</h4>
                <p>Bs 12.00</p>
              </div>
            </div>
            <div className="info-card">
              {/* <Users className="info-icon" /> */}
              <div className="info-text">
                <h4>VIP Sala</h4>
                <p>Bs 30.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;