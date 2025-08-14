import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { fetchSearchMovies } from "../../services/MovieApi/movie-api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const [searchMovieText, setSearchMovieText] = useState(queryParam);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const results = await fetchSearchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchValue = form.elements.movie.value.trim();
    if (searchValue === "") {
      alert("Please enter a movie name");
      return;
    }
    setSearchParams({ query: searchValue });
    event.target.reset();
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          name="movie"
          placeholder="Search movies"
          value={searchMovieText}
          onChange={(e) => setSearchMovieText(e.target.value)}
          autoComplete="off"
          autoFocus
          className={styles.formInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}

      {!isLoading && searchResults.length > 0 && <MovieList movies={searchResults} />}
    </>
  );
};

export default MoviesPage;
