import { useState } from 'react';
import axios from 'axios';
import DarkMode from './DarkMode';

interface SearchBarProps {
  onSearch: (movies: any[]) => void;
  setCategory: (category: 'popular' | 'now_playing' | 'top_rated') => void;
  category: 'popular' | 'now_playing' | 'top_rated';
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchBar = ({ onSearch, setCategory, category }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const searchMovies = async (query: string) => {
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
      onSearch(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
    } finally {
      setLoading(false);
    }
  };

  const searchSuggestions = async (query: string) => {
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
      setSuggestions(response.data.results.slice(0, 5));
    } catch (error) {
      console.error('Erro ao buscar sugestões', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value;
    setQuery(queryValue);
    if (queryValue.trim()) { 
      searchSuggestions(queryValue);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && query.trim()) {
      event.preventDefault();
      searchMovies(query);
    }
  };

  return (
    <div className="mb-8 flex flex-col items-center relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Busque por um filme..."
        className="border p-2 w-full max-w-md rounded-md dark:bg-gray-900 dark:text-white"
      />

      {/* Exibir sugestões enquanto o usuário digita */}
      {suggestions.length > 0 && query.trim() && (
        <ul className="mt-1 w-full max-w-md bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                setQuery(movie.title);
                onSearch([movie]);
                setSuggestions([]);
              }}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}

      {/* Botões para alterar a categoria */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setCategory('popular')}
          className={`p-2 rounded-md ${category === 'popular' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}
        >
          Filmes Populares
        </button>

        <button
          onClick={() => setCategory('now_playing')}
          className={`p-2 rounded-md ${category === 'now_playing' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}
        >
          Lançamentos
        </button>

        <button
          onClick={() => setCategory('top_rated')}
          className={`p-2 rounded-md ${category === 'top_rated' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}
        >
          Melhores Avaliados
        </button>
      </div>

      {/* Adicionando o botão de troca de tema alinhado à esquerda */}
      <div>
        <DarkMode />
      </div>
    </div>
  );
};

export default SearchBar;
