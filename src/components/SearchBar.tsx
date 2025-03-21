import { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

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
        params: { api_key: API_KEY, language: 'pt-BR', query, page: 1 },
      });
      onSearch(response.data.results);
      setSuggestions([]);
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
    } finally {
      setLoading(false);
    }
  };

  const searchSuggestions = async (query: string) => {
    if (!query.trim()) return setSuggestions([]);

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, language: 'pt-BR', query, page: 1 },
      });
      setSuggestions(response.data.results.slice(0, 5));
    } catch (error) {
      console.error('Erro ao buscar sugestões', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    searchSuggestions(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) searchMovies(query);
  };

  return (
    <div className="flex flex-col items-center w-full mt-8 relative">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Busque por um filme..."
          className="w-full p-3 pl-10 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out z-10"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={16} />
      </div>

      {/* Sugestao De Filmes */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full max-w-lg bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 z-10 mt-12">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                setQuery(movie.title);
                onSearch([movie]);
                setSuggestions([]);
              }}
              className="p-3 cursor-pointer text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ease-in-out"
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center space-x-3 mt-4">
        {[
          { label: 'Populares', value: 'popular' },
          { label: 'Lançamentos', value: 'now_playing' },
          { label: 'Top Avaliados', value: 'top_rated' },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setCategory(value as 'popular' | 'now_playing' | 'top_rated')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ease-in-out ${
              category === value
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
