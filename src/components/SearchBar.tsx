import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 p-4 md:p-6 lg:p-8">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procure por um filme..."
          className="border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 w-full sm:w-2/3 md:w-3/4 lg:w-4/5"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;