import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '@/components/StarRating';
import SaveForLaterButton from '@/components/SaveForLaterButton';
import Comments from '@/components/Comments'; // Importando o componente Comments
import HomeButton from '@/components/HomeButton'; // Importando o componente HomeButton
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
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
          language: 'pt-BR',
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
    }
  };

  if (!movie) { // 
    return <div className="text-center text-gray-500">Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={256}
            height={384}
            className="w-64 h-auto rounded-md mb-4 md:mb-0 md:mr-8"
          />
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{movie.release_date}</p>
            <p className="text-gray-800 dark:text-gray-300 mb-4">{movie.overview}</p>

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

            {/* Componente de Comentários */}
            <div className="mt-6 w-full">
              <Comments movieId={movie.id} />
            </div>
          </div>
        </div>
      </div>
      {/* Componente de Botao */}
        <div className="mt-6">
          <HomeButton /> 
        </div>
    </div>
  );
};

export default MovieDetails;
