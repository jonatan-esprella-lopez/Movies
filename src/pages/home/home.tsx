import "../../style/styles-movie.css";
import { HeaderNav } from "../../components/header";
import { MovieSlider } from "../../components/movie-slider/movie-slider";
import { Outlet } from 'react-router-dom';
import { Footer } from "../../components/footer/footer";

export function Home() {
  return (
    <main className="container-main">
      <HeaderNav/>
      <MovieSlider /> 
      <Outlet /> 
      <Footer />  
    </main>
  );
};