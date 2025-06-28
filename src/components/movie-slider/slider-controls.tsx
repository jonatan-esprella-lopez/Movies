import { SliderControlsProps } from "@/interfaces/common.interfaces";


export const SliderControls = ({ onPrevious, onNext }: SliderControlsProps): JSX.Element => (
  <>
    <button className="slider-arrow left-arrow" onClick={onPrevious}>
      &#10094;
    </button>
    <button className="slider-arrow right-arrow" onClick={onNext}>
      &#10095;
    </button>
  </>
);
