import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieCast } from "../../services/MovieApi/movie-api";
import style from "./MovieCast.module.css";

const MoviesCast = () => {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMovieCast(movieId);
        setCastInfo(response || []);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast information...</p>;
  if (error) return <p style={{ color: "red" }}>Error fetching cast information</p>;

  return (
    <ul className={style.castList}>
      {castInfo.length > 0 ? (
        castInfo.map((actor) => (
          <li className={style.castItem} key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://placehold.co/200x300?text=No+Image"
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character || "Unknown"}</p>
          </li>
        ))
      ) : (
        <div>There is no cast info for this movie</div>
      )}
    </ul>
  );
};

export default MoviesCast;
