interface SliderDotsProps {
  count: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export const SliderDots = ({ count, currentIndex, onDotClick }: SliderDotsProps) => (
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
