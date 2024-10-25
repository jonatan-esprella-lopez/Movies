  import { useState } from "react";
  import { SliderControls } from "./slider-controls";
  import { SliderDots } from "./slider-dots";
  import { SliderContent } from "./slider-content.tsx";
  import "./slider.css"

  export function MovieSlider(): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    const goToNextSlide = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex === 7 - 1 ? 0 : prevIndex + 1));
    };
    const goToPreviousSlide = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 7 - 1 : prevIndex - 1));
    };

    const handleDotClick = (index: number): void => {
      setCurrentIndex(index);
    };
  
    return (
      <div className="slider">
          <SliderControls onPrevious={goToPreviousSlide} onNext={goToNextSlide} />
          <SliderContent currentIndex={ currentIndex } />
          <SliderDots count={7} currentIndex={currentIndex} onDotClick={handleDotClick} />
      </div>
    );
  }
