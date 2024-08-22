import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  rating: number | null;
}

const ProfilePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [savedForLaterMovies, setSavedForLaterMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Carregar filmes avaliados do localStorage
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {movies.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Filmes Avaliados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                rating={movie.rating!}
                onRemove={(id: number) => {
                  setMovies(movies.filter(m => m.id !== id));
                  localStorage.removeItem(`rating-${id}`);
                  localStorage.removeItem(`title-${id}`);
                  localStorage.removeItem(`poster-${id}`);
                }}
              />
            ))}
          </div>
        </>
      )}

      {savedForLaterMovies.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Assistir Mais Tarde</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {savedForLaterMovies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                rating={movie.rating!}
                onRemove={(id: number) => {
                  setSavedForLaterMovies(savedForLaterMovies.filter(m => m.id !== id));
                  localStorage.removeItem(`savedForLater-${id}`);
                  localStorage.removeItem(`title-${id}`);
                  localStorage.removeItem(`poster-${id}`);
                }}
              />
            ))}
          </div>
        </>
      )}

      {movies.length === 0 && savedForLaterMovies.length === 0 && (
        <p className="text-center text-gray-500">Nenhuma avaliação ou filme salvo para assistir mais tarde.</p>
      )}
    </div>
  );
};

export default ProfilePage;
