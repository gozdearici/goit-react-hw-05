import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { fetchTrendingMovies } from "../../services/MovieApi/movie-api";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const trendingMoviesList = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchTrendingMovies();
        setTrendingMovies(response);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    trendingMoviesList();
  }, []);

  return (
    <>
      <div className={style.homePageTitle}>Trending Today</div>

      {isLoading && <p>Loading trending movies...</p>}
      {error && <p style={{ color: "red" }}>Failed to load trending movies.</p>}

      {!isLoading && !error && (
        <ul>
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={location.pathname}>
                  {movie.title}
                </Link>
              </li>
            ))
          ) : (
            <div>No trending movies found.</div>
          )}
        </ul>
      )}
    </>
  );
};

export default HomePage;
