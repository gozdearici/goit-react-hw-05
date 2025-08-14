import { useEffect, useState, useRef } from "react";
import { Link, Outlet, useParams, useLocation, NavLink } from "react-router";
import { fetchMovieDetails } from "../../services/MovieApi/movie-api";
import style from "./MoviesDetailsPage.module.css";

const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <Link to={backLinkRef.current} className={style.goBackButton}>
        Go Back
      </Link>
      {isLoading && <p>Loading movie details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && !error && movieDetails && (
        <div className={style.movieDetails}>
          {movieDetails ? (
            <>
              <div>
                <img
                  className={style.moviePoster}
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              </div>
              <div className={style.movieInfo}>
                <h2>{movieDetails.title}</h2>
                <p>User Score: {movieDetails.vote_average * 10}%</p>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
                <h4>Release Date</h4>
                <p>{movieDetails.release_date}</p>
                <h4>Genres</h4>
                <div className={style.genresList}>
                  {movieDetails.genres?.map((genre) => {
                    return <span key={genre.id}>{genre.name}</span>;
                  })}
                </div>
              </div>
            </>
          ) : (
            <p>Loading movie details...</p>
          )}
        </div>
      )}

      <div className={style.additionalInfoContainer}>
        <h3>Additional Information</h3>
        <div className={style.additionalInfo}>
          <NavLink to={`cast`} state={backLinkRef.current}>
            Cast
          </NavLink>
          <NavLink to={`reviews`} state={backLinkRef.current}>
            Reviews
          </NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MoviesDetailsPage;
