import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies.ts';
import './movie-detail.css';
import { useMovieStore } from '../../../stores/movie-store.ts';
import { DateSelector } from './date-selector.tsx';
import { useEffect, useState } from 'react';
import { useCarteleraStore } from '../../../stores/cartelera-movie.ts';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === Number(id));

  const {
    selectedMovieId,
    showtimeData,
    setSelectedMovie,
    setShowtimeData,
  } = useCarteleraStore();

  useEffect(() => {
    if (id) setSelectedMovie(Number(id));
  }, [id, setSelectedMovie]);


  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedRoom(null);
    setShowtimeData(Number(id), { ...currentData, date, time: null, room: null });
 
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setSelectedRoom(null);
    setShowtimeData(Number(id), { ...currentData, time, room: null });
  };

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room);
    setShowtimeData(Number(id), { ...currentData, room });
  };

  const { selectedMovie } = useMovieStore();

  if (!selectedMovie) return <div>Movie not found</div>;

  const currentData = showtimeData[Number(id)] || {
    date: 24,
    time: null,
    room: null,
  };

  const showtimesByDate: { [key: number]: string[] } = {
    24: ['12:30', '15:45', '18:15'],
    25: ['13:00', '16:00', '19:00', '22:00'],
    26: ['11:00', '14:30', '17:30', '20:30'],
    27: ['12:30', '15:45', '18:15'],
    28: ['13:00', '16:00', '19:00', '22:00'],
    29: ['11:00', '14:30', '17:30', '20:30'],
  };

  const roomsByTime: { [key: string]: string[] } = {
    '12:30': ['Sala 1', 'Sala 3'],
    '15:45': ['Sala 2', 'Sala VIP', 'Sala VIP 1'],
    '18:15': ['Sala 1', 'Sala 4'],
    '13:00': ['Sala 5'],
    '16:00': ['Sala VIP', 'Sala 2'],
    '19:00': ['Sala 3', 'Sala 4'],
    '22:00': ['Sala VIP'],
    '11:00': ['Sala 1'],
    '14:30': ['Sala 2', 'Sala 3'],
    '17:30': ['Sala 4'],
    '20:30': ['Sala VIP', 'Sala 1'],
  };

  const roomPrices: { [key: string]: { type: string; price: number } } = {
    'Sala 1': { type: 'General', price: 12 },
    'Sala 2': { type: 'General', price: 12 },
    'Sala 3': { type: 'General', price: 12 },
    'Sala 4': { type: 'General', price: 12 },
    'Sala 5': { type: 'General', price: 12 },
    'Sala VIP': { type: 'VIP', price: 30 },
  };

  // const showtimes = showtimesByDate[selectedDate] || [];
  // const availableRooms = selectedTime ? roomsByTime[selectedTime] : [];
  // const selectedRoomInfo = selectedRoom ? roomPrices[selectedRoom] : null;


  const showtimes = showtimesByDate[currentData.date] || [];
  const availableRooms = currentData.time ? roomsByTime[currentData.time] : [];
  const selectedRoomInfo = currentData.room ? roomPrices[currentData.room] : null;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <div className="movie-info-section">
          <div className="movie-meta">
            <div className="meta-item">
              <span>{parseInt(selectedMovie.runtime / 60) + '.' + (selectedMovie.runtime % 60)} Hrs</span>
            </div>
            <div className="meta-item">
              <span>
                {selectedMovie.genres?.length > 0
                  ? selectedMovie.genres.map((genre) => <>{" . " + genre.name}</>)
                  : 'No hay géneros registrados'}
              </span>
            </div>
            <div className="meta-item">
              <strong className="country-movie">Ciudad de origen: {selectedMovie.origin_country}</strong>
            </div>
          </div>

          <div className="showtimes-section">
            <h2>Selecciona una fecha</h2>
            <DateSelector selectedDate={currentData.date} onDateSelect={handleDateClick} />
            <h2>Horarios del {currentData.date} de Octubre</h2>
            <div className="showtimes-grid">
              {showtimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`showtime-button ${currentData.time === time ? 'selected' : ''}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {currentData.time && (
            <div className="rooms-section">
              <h2>Salas disponibles para las {currentData.time}</h2>
              <div className="rooms-grid">
                {availableRooms.length > 0 ? (
                  availableRooms.map((room) => (
                    <button
                      key={room}
                      onClick={() => handleRoomClick(room)}
                      className={`room-card ${currentData.room === room ? 'selected' : ''}`}
                    >
                      <h4>{room}</h4>
                      <p>Detalles de la sala...</p>
                    </button>
                  ))
                ) : (
                  <p>No hay salas disponibles para esta hora.</p>
                )}
              </div>
            </div>
          )}

          {selectedRoomInfo && (
            <div className="ticket-info">
              <div className="info-card">
                <div className="info-text">
                  <h4>{selectedRoomInfo.type} - {currentData.room}</h4>
                  <p>Bs {selectedRoomInfo.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
