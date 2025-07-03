import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMovieStore } from "@/stores/movie-store";
import { imageApi } from "@/services/movie-api";

import { HeaderNav } from "@/components/header";
import { Checkout } from "./components/Checkout";
import { MovieDetail } from "./components/movie-details";
import { SeatMap } from "./components/seat-map";
import { Footer } from "@/components/footer/footer";

import { roomPrices } from "@/constants";
import "./cartelera.css";

export const Cartelera = () => {
  const {
    movies,
    detailsMovie,
    setMovieDetails
  } = useMovieStore();
  
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  
  const { movieId } = useParams();
  const [_selectedDate, setSelectedDate] = useState<number>(24);
  const [_selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<keyof typeof roomPrices>("Sala 1");



  const handleMovieSelected = (movieId: number): void => {
    setMovieDetails(movieId);
    setStep(1);
    window.scrollTo({ top: 445, behavior: "smooth" });
    navigate(`/cartelera?query=${movieId}`);
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

  const portada = detailsMovie ? imageApi(detailsMovie.poster_path, "w200") : "";

  return (
    <main className="container-main">
      <HeaderNav />
      <h2>Selecciona una película</h2>
      <section className="conteiner-movies-cartelera">
        {movies.map((movie) => (
          <div
            className="cartelera-movie"
            key={movie.id}
            onClick={() => handleMovieSelected(movie.id)}
          >
            <img src={imageApi(movie.poster_path, "w200")} alt={movie.title} />
          </div>
        ))}
      </section>

      {(detailsMovie) && (
        <section className="Selected-mov-Cartelera">
          <div className="image-container">
            <header>
              <img src={portada} alt={detailsMovie.title} className="hover-image" />
              <h1 className="movie-title">{detailsMovie.title}</h1>
            </header>
            <section className="movie-synopsis">
              <h2>Descripción</h2>
              <p className="movie-description">{detailsMovie.overview}</p>
            </section>
          </div>

          <section className="conte">
            <h2>Adquiere tu entrada</h2>
            {step === 1 && (<MovieDetail setSelectedRoomType={setSelectedRoomType} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} />)}
            {step === 2 && (<SeatMap movieId={Number(movieId)} price={roomPrices[selectedRoomType].price} />)}
            {step === 3 && detailsMovie && (
              <Checkout
                movie={{ price: roomPrices[selectedRoomType].price }}
                seats={[]} // Replace with actual selected seats if available
              />
            )}

            <article className="conteiner-movie-sell">
              <button className="btn-1-reserve btn-add" onClick={handleMovieBack}>
                Atrás
              </button>
              {step < 3 ? (
                <button className="btn-1-reserve btn-add" onClick={handleMovieNext}>
                  Siguiente
                </button>
              ) : (
                <button className="btn-1-reserve btn-add">
                  Completar pago
                </button>
              )}
            </article>
          </section>
        </section>
      )}
      <Footer />
    </main>
  );
};
