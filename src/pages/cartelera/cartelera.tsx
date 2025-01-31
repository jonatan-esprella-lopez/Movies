import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMovieStore } from "@/stores/movie-store";
import { imageApi } from "@/services/movie-api";

import { ROOM_PRICES } from "@/constants";

import { HeaderNav } from "@/components/header";
import Checkout from "./components/Checkout";
import MovieDetail from "./components/movie-details";
import { SeatMap } from "./components/seat-map";
import { Footer } from "@/components/footer/footer";

import type { SingleMovieDetails } from "@/interfaces/single-movie-details";

import "./cartelera.css";

// import { useCarteleraStore } from "@/stores/Cartelera-store";
// import { PurchaseModal } from "./components/purchase-modal";

export const Cartelera = () => {
  const {
    movies,
    selectedMovie,
    setSelectedMovie,
  } = useMovieStore();

  const navigate = useNavigate();
  const { movieId } = useParams();
  const parsedMovieId = movieId ? parseInt(movieId, 10) : Number;

  const [step, setStep] = useState<number>(1);
  const [selectedRoomType, _setSelectedRoomType] = useState<keyof typeof ROOM_PRICES>("standard");

  const handleMovieSelected = (movie: SingleMovieDetails): void => {
    setSelectedMovie(movie);
    setStep(1);
    window.scrollTo({ top: 445, behavior: "smooth" });
    navigate(`/cartelera/${movie.id}`);
  };

  const handleMovieNext = () => {
    if (step < 3) {
      window.scrollTo({ top: 445, behavior: "smooth" });
      setStep(step + 1);
    }
  };

  const handleMovieBack = () => {
    if (step > 1) {
      window.scrollTo({ top: 445, behavior: "smooth" });
      setStep(step - 1);
    }
  };

  const portada = selectedMovie ? imageApi(selectedMovie.poster_path, "w200") : "";

  return (
    <main className="container-main">
      <HeaderNav />
      <h2>Selecciona una película</h2>
      <section className="conteiner-movies-cartelera">
        {movies.map((movie) => (
          <div
            className="cartelera-movie"
            key={movie.id}
            onClick={() => handleMovieSelected(movie)}
          >
            <img src={imageApi(movie.poster_path, "w200")} alt={movie.title} />
          </div>
        ))}
      </section>

      {(selectedMovie) && (
        <section className="Selected-mov-Cartelera">
          <div className="image-container">
            <img src={portada} alt={selectedMovie.title} className="hover-image" />
            <h1 className="movie-title">{selectedMovie.title}</h1>
            <div className="movie-synopsis">
              <h2>Descripción</h2>
              <p className="movie-description">{selectedMovie.overview}</p>
            </div>
          </div>
          <section className="conte">
            <h2>Detalles de compra</h2>

            {step === 1 && <MovieDetail />}
            {step === 2 && (
              <SeatMap movieId={parsedMovieId} roomType={selectedRoomType} />
            )}
            {step === 3 && (
              <Checkout
                movie={selectedMovie}
                time={selectedTime}
                seats={selectedSeats}
              />
            )}

            <div className="conteiner-movie-sell">
              <button className="btn-1-reserve btn-add" onClick={handleMovieBack}>
                Atrás
              </button>
              {step < 3 ? (
                <button className="btn-1-reserve btn-add" onClick={handleMovieNext}>
                  Siguiente
                </button>
              ) : (
                <button
                  className="btn-1-reserve btn-add"
                  disabled={selectedSeats.length === 0}
                >
                  Completar pago
                </button>
              )}
            </div>
          </section>
        </section>
      )}
      <Footer />
    </main>
  );
};
