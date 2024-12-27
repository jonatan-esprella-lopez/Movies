import { useEffect, useState } from "react";
import { useMovieStore } from "../../stores/movie-store";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { HeaderNav } from "../../components/header";
import { Footer } from "../../components/footer/footer";
import "./cartelera.css";
import { SingleMovieDetails } from "../../interfaces/single-movie-details";
import { imageApi } from "../../services/movie-api";
import { SeatMap } from "./components/seat-map";
import Checkout from "./Checkout";
import { useCarteleraStore } from "../../stores/Cartelera-store";
import MovieDetail from "./components/movie-details";
import { PurchaseModal } from "./components/purchase-modal";

export const Cartelera = (): JSX.Element => {
  const {
    selectedMovie,
    movies,
    setSelectedMovie,
    loadMovies,
  } = useMovieStore();

  const { seats } = useCarteleraStore();

  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const movieId = useParams<{ movieId: string }>().movieId;

  useEffect(() => {
    loadMovies();
  }, [loadMovies, selectedMovie]);

  const handleMovieSelected = (movie: SingleMovieDetails): void => {
    setSelectedMovie(movie);
    
    // Reiniciar los valores de step, asientos y tiempo seleccionado al elegir una nueva película
    setStep(1);
    setSelectedSeats([]);
    setSelectedTime("");
  
    window.scrollTo({ top: 445, behavior: "smooth" });
    navigate(`/cartelera/${movie.id}`);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handleMovieNext = () => {
    if (step < 3) {
      setSelectedSeats([]);
      window.scrollTo({ top: 445, behavior: "smooth" });
      setStep(step + 1);
    }
  };

  const handleMovieBack = () => {
    if (step > 1) {
      setSelectedSeats([]);
      window.scrollTo({ top: 445, behavior: "smooth" });
      setStep(step - 1);
    }
  };


  
  const handleCheckout = () => {
    setStep(3);
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

      {selectedMovie && (
        <section className="Selected-mov-Cartelera">
          <div>
            <img src={portada} alt={selectedMovie.title} />
            <h1 className="movie-title">{selectedMovie.title}</h1>
          </div>
          <section className="conte">
            <h2>Selecciona tus asientos</h2>

            {step === 1 && <MovieDetail />}
            {step === 2 && <SeatMap movieId={movieId} />}
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
