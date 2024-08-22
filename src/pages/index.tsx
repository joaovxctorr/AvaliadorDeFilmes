import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa'; // Importando o ícone de perfil
import Image from 'next/image'; // Importando o componente Image do Next.js

const API_KEY = 'a6734746bce3d7dd39fa4e2400a0f55e';
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar os filmes mais populares
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR', // Define o idioma para português
          page: 1,
        },
      });
      setMovies(response.data.results.slice(0, 18)); // Pega os 18 primeiros filmes populares
    } catch (error) {
      console.error('Erro ao buscar filmes populares', error);
    }
  };

  // Função para buscar filmes com base na consulta do usuário
  const searchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR',
          query: query,
          page: 1,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies(); // Busca os filmes populares quando o componente carrega
  }, []);

  // Função para lidar com a pesquisa de filmes
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      searchMovies(); // Chama a função de busca quando a consulta não estiver vazia
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-4 max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-center w-full mb-4 sm:mb-0">Buscador De Filmes</h1>
          <Link href="/profile">
            <FaUser size={24} className="text-gray-700 dark:text-gray-300" /> {/* Ícone de perfil */}
          </Link>
        </div>
        <form onSubmit={handleSearch} className="mb-8 flex flex-col items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por um filme..."
            className="border p-2 w-full max-w-md rounded-md dark:bg-gray-900 dark:text-white"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded-md">
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <Link href={`/movies/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300} 
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
