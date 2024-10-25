import { SliderDotsProps } from "../../interfaces/common.interfaces";

export const SliderDots = ({ count, currentIndex, onDotClick }: SliderDotsProps): JSX.Element => (
  <div className="slider-dots">
    {Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        className={`dot ${index === currentIndex ? 'active' : ''}`}
        onClick={() => onDotClick(index)}
      ></span>
    ))}
  </div>
);
