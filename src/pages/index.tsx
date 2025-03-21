import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState<'popular' | 'now_playing' | 'top_rated'>('popular');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/movie/${category}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: 1,
          },
        });

        let fetchedMovies = response.data.results;

        if (category === 'now_playing') {
          fetchedMovies = fetchedMovies.sort((a: Movie, b: Movie) => {
            const dateA = new Date(a.release_date).getTime();
            const dateB = new Date(b.release_date).getTime();
            return dateB - dateA;
          });
        }

        setMovies(fetchedMovies.slice(0, 18));
      } catch (error) {
        console.error('Erro ao buscar filmes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="p-6 max-w-7xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-center w-full mb-4 sm:mb-0 text-gray-100 drop-shadow-lg">Buscador De Filmes</h1>
          <Link href="/profile" className="hover:scale-110 transition-transform">
            <FaUser size={38} className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 p-2 shadow-lg" />
          </Link>
        </div>

        {/* Barra de pesquisa */}
        <SearchBar onSearch={setMovies} setCategory={setCategory} category={category} />

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center text-gray-400 text-lg font-medium mt-6 animate-pulse">Carregando...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <Link href={`/movies/${movie.id}`}>
                  <div className="relative group cursor-pointer">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={300}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <p className="text-white text-lg font-semibold">Ver detalhes</p>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <h2 className="text-md font-bold truncate text-gray-200">{movie.title}</h2>
                  <p className="text-sm text-gray-400">{new Date(movie.release_date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
