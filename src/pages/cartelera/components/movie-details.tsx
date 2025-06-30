import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMovieStore } from "@/stores/movie-store.ts";

import { DateSelector } from "./date-selector.tsx";

import { roomPrices, roomsByTime, showtimesByDate } from "@/constants.tsx";
import "./movie-detail.css";

export const showtimeData: Record<number, { date: number; time: string | null; room: string | null }> = {};

export function setShowtimeData(
  id: number,
  data: { date: number; time: string | null; room: string | null }
) {
  showtimeData[id] = data;
}

interface MovieDetailProps {
  setSelectedRoomType: React.Dispatch<React.SetStateAction<keyof typeof roomPrices>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({
  setSelectedRoomType,
  setSelectedTime,
  setSelectedDate,
}) => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("query");
  
  const { setMovieDetails } = useMovieStore();

  useEffect(() => {
    if (id) setMovieDetails(Number(id));
  }, [id]);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedRoomType("standard");
    setShowtimeData(Number(id), {
      ...currentData,
      date,
      time: null,
      room: null,
    });
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setSelectedRoomType("standard");
    setShowtimeData(Number(id), {
       ...currentData, 
       time, 
       room: 
       null 
    });
  };

  const handleRoomClick = (room: string) => {
    setSelectedRoomType(room as keyof typeof roomPrices);
    setShowtimeData(Number(id), { 
      ...currentData, 
      room 
    });
  };

  const { detailsMovie } = useMovieStore();

  if (!detailsMovie) return <div>Movie not found</div>;

  const currentData = showtimeData[Number(id)];

  const showtimes = showtimesByDate[currentData.date] || [];
  const availableRooms = currentData.time ? roomsByTime[currentData.time] : [];
  const selectedRoomInfo = currentData.room
    ? roomPrices[currentData.room]
    : null;

  return (
    <section className="movie-detail-container">
      <div className="movie-detail-content">
        <div className="movie-info-section">
          <article className="movie-meta">
            <div className="meta-item">
              <span>
                {Math.floor(detailsMovie.runtime / 60) +
                  "." +
                  (detailsMovie.runtime % 60)}{" "}
                Hrs
              </span>
            </div>
            <div className="meta-item">
              <span>
                {detailsMovie.genres?.length > 0
                  ? detailsMovie.genres.map((genre) => (
                      <>{" . " + genre.name}</>
                    ))
                  : "No hay géneros registrados"}
              </span>
            </div>
            <div className="meta-item">
              <strong className="country-movie">
                Ciudad de origen: {detailsMovie.origin_country}
              </strong>
            </div>
          </article>

          <article className="showtimes-section">
            <h2>Selecciona una fecha</h2>
            <DateSelector
              selectedDate={currentData.date}
              onDateSelect={handleDateClick}
            />
            <h2>Horarios del {currentData.date} de Octubre</h2>
            <div className="showtimes-grid">
              {showtimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`showtime-button ${
                    currentData.time === time ? "selected" : ""
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </article>

          {currentData.time && (
            <article className="rooms-section">
              <h2>Salas disponibles para las {currentData.time}</h2>
              <div className="rooms-grid">
                {availableRooms.length > 0 ? (
                  availableRooms.map((room) => (
                    <button
                      key={room}
                      onClick={() => handleRoomClick(room)}
                      className={`room-card ${
                        currentData.room === room ? "selected" : ""
                      }`}
                    >
                      <h4>{room}</h4>
                      <p>Detalles de la sala...</p>
                    </button>
                  ))
                ) : (
                  <p>No hay salas disponibles para esta hora.</p>
                )}
              </div>
            </article>
          )}

          {selectedRoomInfo && (
            <div className="ticket-info info-text info-card">
              <h4>
                {selectedRoomInfo.type} - {currentData.room}
              </h4>
              <p>Bs {selectedRoomInfo.price.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
