import axios from 'axios';

const API_KEY = 'a6734746bce3d7dd39fa4e2400a0f55e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};
