export interface StarRatingProps {
    voteAverage: number;
}

export interface ModalMoviesProps {
    modalMovie: boolean;
    movieId: number;
    onClose: () => void;
}