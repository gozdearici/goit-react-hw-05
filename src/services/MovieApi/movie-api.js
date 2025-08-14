import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjkzYTBjYzIyNTk5ZWY3MGI0ZmVmODlhODM5YWJhNyIsIm5iZiI6MTc1MDAxMjA3OS43NjcsInN1YiI6IjY4NGYxMGFmNDJiM2Q0M2UxNjFlYzllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0hfzCRHU2tqJ_-GZpGPGt1qJ03YkYq_jymAZBdI3-Vk";

const BASE_URL = "https://api.themoviedb.org/3";

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, axiosConfig);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, axiosConfig);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching cast for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, axiosConfig);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchSearchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      ...axiosConfig,
      params: { query, include_adult: false },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching search results for query "${query}":`, error);
    throw error;
  }
};
