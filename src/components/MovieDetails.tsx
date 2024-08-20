import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '@/components/StarRating'; 
import SaveForLaterButton from '@/components/SaveForLaterButton'; 
import Image from 'next/image';

const API_KEY = 'a6734746bce3d7dd39fa4e2400a0f55e'; 
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id as string);
    }
  }, [id]);

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });
      setMovie(response.data);
    } catch (error) {
      console.error('Failed to fetch movie details', error);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (movie) {
      localStorage.setItem(`rating-${movie.id}`, newRating.toString());
      localStorage.setItem(`title-${movie.id}`, movie.title);
      localStorage.setItem(`poster-${movie.id}`, movie.poster_path);
    }
  };

  if (!movie) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={256} // Define a largura da imagem (ajustável)
            height={384} // Define a altura da imagem (ajustável)
            className="w-64 h-auto rounded-md mb-4 md:mb-0 md:mr-8"
          />
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="text-3xl font-bold mb-2 text-center md:text-left">{movie.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-center md:text-left">
              {movie.release_date}
            </p>
            <p className="text-gray-800 dark:text-gray-300 mb-4 text-center md:text-left">
              {movie.overview}
            </p>
            
            <StarRating
              movieId={movie.id}
              movieTitle={movie.title}
              moviePosterPath={movie.poster_path}
              initialRating={rating}
              onRatingChange={handleRatingChange}
            />

            <SaveForLaterButton
              movieId={movie.id}
              movieTitle={movie.title}
              moviePosterPath={movie.poster_path}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
