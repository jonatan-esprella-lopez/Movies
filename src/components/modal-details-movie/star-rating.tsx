import { StarRatingProps } from "../../interfaces/common.interfaces";

import Star from "../../assets/movies/star.svg";

export const StarRating = ({ voteAverage }: StarRatingProps):JSX.Element => {
  const starClass = voteAverage > 5 ? "container-stars" : "container-stars-low";

  return (
    <div className={starClass}>
      <img src={Star} alt="star" />
      {voteAverage}
    </div>
  );
};
