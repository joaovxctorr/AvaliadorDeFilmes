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

  // Função para buscar filmes conforme a categoria
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${category}`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
          page: 1,
        },
      });

      let fetchedMovies = response.data.results;

      // Ordenar por data se for a categoria 'now_playing'
      if (category === 'now_playing') {
        fetchedMovies = fetchedMovies.sort((a: Movie, b: Movie) => {
          const dateA = new Date(a.release_date).getTime();
          const dateB = new Date(b.release_date).getTime();
          return dateB - dateA; // Ordem decrescente
        });
      }

      setMovies(fetchedMovies.slice(0, 18));
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
    }
  };

  useEffect(() => {
    fetchMovies(); // Carrega filmes pela categoria
  }, [category]);

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
  <div className="p-4 max-w-6xl w-full">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-center w-full mb-4 sm:mb-0">Buscador De Filmes</h1>
      <Link href="/profile">
        <FaUser
          size={34}  
          className="bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition duration-200 p-2" 
        />
      </Link>
    </div>


        {/* Barra de pesquisa */}
        <SearchBar onSearch={setMovies} setCategory={setCategory} category={category} />

        {/* Exibição dos filmes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={450}
                  className="w-full h-auto rounded-md cursor-pointer mb-2"
                />
              </Link>
              <h2 className="text-sm font-semibold mb-2 truncate">{movie.title}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
