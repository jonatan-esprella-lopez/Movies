import { SingleMovieDetails } from "./single-movie-details";

export interface SliderControlsProps {
    onPrevious: () => void;
    onNext: () => void;
}


export interface SliderDotsProps {
    count: number;
    currentIndex: number;
    onDotClick: (index: number) => void;
}

export interface StarRatingProps {
    voteAverage: number;
}

export interface CardMovieProps {
    movie: SingleMovieDetails;
}