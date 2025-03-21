import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import HomeButton from '@/components/HomeButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  rating: number | null;
}

const ProfilePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [savedForLaterMovies, setSavedForLaterMovies] = useState<Movie[]>([]);
  const [isRatedMoviesVisible, setIsRatedMoviesVisible] = useState(true);

  useEffect(() => {
    const ratedMovies: Movie[] = [];
    const savedLaterMovies: Movie[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith('rating-')) {
        const movieId = key.replace('rating-', '');
        const rating = localStorage.getItem(key);
        const title = localStorage.getItem(`title-${movieId}`);
        const posterPath = localStorage.getItem(`poster-${movieId}`);

        if (rating && title && posterPath) {
          ratedMovies.push({
            id: parseInt(movieId, 10),
            title,
            poster_path: posterPath,
            rating: parseFloat(rating),
          });
        }
      }

      if (key && key.startsWith('savedForLater-')) {
        const movieId = key.replace('savedForLater-', '');
        const title = localStorage.getItem(`title-${movieId}`);
        const posterPath = localStorage.getItem(`poster-${movieId}`);

        if (title && posterPath) {
          savedLaterMovies.push({
            id: parseInt(movieId, 10),
            title,
            poster_path: posterPath,
            rating: null,
          });
        }
      }
    }

    setMovies(ratedMovies);
    setSavedForLaterMovies(savedLaterMovies);
  }, []);

  const handleRemove = (id: number, fromList: 'rated' | 'saved') => {
    if (fromList === 'rated') {
      setMovies(movies.filter(m => m.id !== id));
      localStorage.removeItem(`rating-${id}`);
      localStorage.removeItem(`title-${id}`);
      localStorage.removeItem(`poster-${id}`);
      toast.success('Filme removido da lista de avaliados!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (fromList === 'saved') {
      setSavedForLaterMovies(savedForLaterMovies.filter(m => m.id !== id));
      localStorage.removeItem(`savedForLater-${id}`);
      localStorage.removeItem(`title-${id}`);
      localStorage.removeItem(`poster-${id}`);
      toast.success('Filme removido da lista de "Assistir Mais Tarde"!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      {/* Botão de Perfil fixo no topo direito */}
      <div className="absolute top-4 right-4">
        <HomeButton />
      </div>

      {/* Botões de alternância */}
      <div className="mb-6 flex space-x-4 mt-16">
        <button
          onClick={() => setIsRatedMoviesVisible(true)}
          className={`p-2 rounded-md ${isRatedMoviesVisible ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}
        >
          Filmes Avaliados
        </button>
        <button
          onClick={() => setIsRatedMoviesVisible(false)}
          className={`p-2 rounded-md ${!isRatedMoviesVisible ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}
        >
          Assistir Mais Tarde
        </button>
      </div>

      {/* Seção de filmes avaliados */}
      {isRatedMoviesVisible && movies.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Filmes Avaliados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                rating={movie.rating!}
                onRemove={() => handleRemove(movie.id, 'rated')}
              />
            ))}
          </div>
        </>
      ) : !isRatedMoviesVisible && savedForLaterMovies.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Assistir Mais Tarde</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {savedForLaterMovies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                rating={movie.rating!}
                onRemove={() => handleRemove(movie.id, 'saved')}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          Nenhuma avaliação ou filme salvo para assistir mais tarde.
        </p>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
