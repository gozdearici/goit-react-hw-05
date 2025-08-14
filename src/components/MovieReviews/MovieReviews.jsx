import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieReviews } from "../../services/MovieApi/movie-api";
import style from "./MovieReview.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p style={{ color: "red" }}>Error fetching reviews</p>}
      {!isLoading && !error && (
        <ul className={style.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review.id}>
                <h4>Author: {review.author}</h4>
                <p>{review.content}</p>
              </li>
            ))
          ) : (
            <div>There are no reviews for this movie</div>
          )}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
