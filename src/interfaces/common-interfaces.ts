export interface SliderControlsProps {
    onPrevious: () => void;
    onNext: () => void;
}

export interface sliderContentProps {
    currentIndex: number;
}

export interface SliderDotsProps {
    count: number;
    currentIndex: number;
    onDotClick: (index: number) => void;
  }
  