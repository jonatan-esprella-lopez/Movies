  import { useState } from "react";
  import { SliderControls } from "./slider-controls";
  import { SliderDots } from "./slider-dots";
  import { SliderContent } from "./slider-content.tsx";
  
  import "./slider.css"

  export function MovieSlider() {
    // Por el momento no se usara, pero en el panel administrativo si podira cambiar
    const [numberOfSlides, _setNumberOfSlides] = useState<number>(14);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    const goToNextSlide = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex === numberOfSlides - 1 ? 0 : prevIndex + 1));
    };
    const goToPreviousSlide = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? numberOfSlides - 1 : prevIndex - 1));
    };

    const handleDotClick = (index: number): void => {
      setCurrentIndex(index);
    };
  
    return (
      <div className="slider">
          <SliderControls onPrevious={goToPreviousSlide} onNext={goToNextSlide} />
          <SliderContent currentIndex={ currentIndex } />
          <SliderDots count={numberOfSlides} currentIndex={currentIndex} onDotClick={handleDotClick} />
      </div>
    );
  }
