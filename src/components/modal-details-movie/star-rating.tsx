import Star from "../../assets/movies/star.svg";
import { StarRatingProps } from "../../interfaces/common.interfaces";

export const StarRating = ({ voteAverage }: StarRatingProps):JSX.Element => {
  const starClass = voteAverage > 5 ? "container-stars" : "container-stars-low";

  return (
    <div className={starClass}>
      <img src={Star} alt="star" />
      {voteAverage}
    </div>
  );
};
