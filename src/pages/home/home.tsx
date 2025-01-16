import { Outlet } from 'react-router-dom';

import { HeaderNav } from "@/components/header";
import { MovieSlider } from "@/components/movie-slider/movie-slider";
import { Footer } from "@/components/footer/footer";

import "../../style/styles-movie.css";

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