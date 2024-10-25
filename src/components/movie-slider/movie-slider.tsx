  import { useState } from "react";
  import { SliderControls } from "./slider-controls";
  import { SliderDots } from "./slider-dots";
  import { SliderContent } from "./slider-content.tsx";

  export function MovieSlider() {
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
          <SliderContent currentIndex={currentIndex} />
          <SliderDots count={7} currentIndex={currentIndex} onDotClick={handleDotClick} />
        </div>
      </div>
    );
  }
