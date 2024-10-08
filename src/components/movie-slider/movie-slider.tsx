  import { useState,useEffect } from "react";
  import { SliderControls } from "./slider-controls";
  import { SliderDots } from "./slider-dots";
  import { SliderContent } from "./slider-content.tsx";
  import '../../style/inicio-movie.css'
  import { useMovieStore } from '../../stores/movie-store';
  import { Movie } from "../../interfaces/movie.interface.ts";
  import { useLocation } from "react-router-dom";

  

  export function MovieSlider() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    
    const { 
      fetchSearchResults,
      searchResults
    } = useMovieStore();
  
    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
      fetchSearchResults(query);
      setMovies(searchResults);
    }, [fetchSearchResults, searchResults]);
  
  
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 7 - 1 ? 0 : prevIndex + 1));
    };
   
    const goToPreviousSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 7 - 1 : prevIndex - 1));
    };
    const handleDotClick = (index: number) => {
      setCurrentIndex(index);
    };
  
    return (
      <div className="slider">
        <div className="slider-wrapper">
          <SliderControls onPrevious={goToPreviousSlide} onNext={goToNextSlide} />
          <SliderContent movies={movies.slice(0, 7)} currentIndex={currentIndex} />
          <SliderDots count={7} currentIndex={currentIndex} onDotClick={handleDotClick} />
        </div>
      </div>
    );
  }
