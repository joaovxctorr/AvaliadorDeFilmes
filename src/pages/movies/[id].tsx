import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '@/components/StarRating';
import SaveForLaterButton from '@/components/SaveForLaterButton';
import Comments from '@/components/Comments';
import HomeButton from '@/components/HomeButton';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify'; // Importando Toastify
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  runtime: number;
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

      toast.success(`Avaliação do filme salva com sucesso!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!movie) {
    return <div className="text-center text-gray-500">Carregando...</div>;
  }

  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-8">
      <div className="max-w-5xl w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg shadow-gray-800 transition-transform transform hover:scale-105 duration-300">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={256}
            height={384}
            className="w-64 h-auto rounded-lg mb-4 md:mb-0 md:mr-8 shadow-lg"
          />
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">{movie.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{movie.release_date}</p>
            <p className="text-gray-800 dark:text-gray-300 mb-5">{movie.overview}</p>
            <p className="text-gray-700 dark:text-gray-400 mb-2">Nota IMDb: <span className="font-semibold text-yellow-400">{movie.vote_average.toFixed(1)}</span></p>
            <p className="text-gray-700 dark:text-gray-400 mb-4">Duração: {movie.runtime} minutos</p>

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

            <a 
              href={trailerUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition transform hover:scale-105 duration-300 shadow-lg"
            >
              Assistir Trailer
            </a>

            <div className="mt-6 w-full">
              <Comments movieId={movie.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <HomeButton />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
