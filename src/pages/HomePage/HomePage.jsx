import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/MovieApi/movie-api";
import style from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

      {!isLoading &&
        !error &&
        (trendingMovies.length > 0 ? <MovieList movies={trendingMovies} /> : <div>No trending movies found.</div>)}
    </>
  );
};

export default HomePage;
