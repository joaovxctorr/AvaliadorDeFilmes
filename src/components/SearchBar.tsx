import { useState } from 'react';

// Definição das propriedades esperadas pelo componente
interface SearchBarProps {
  onSearch: (query: string) => void; // Função de callback chamada quando a pesquisa é iniciada, com a consulta como argumento
}

// Componente funcional SearchBar
const SearchBar = ({ onSearch }: SearchBarProps) => {
  // Estado para armazenar o valor da pesquisa
  const [query, setQuery] = useState('');

  // Função chamada quando o botão de busca é clicado
  const handleSearch = () => {
    onSearch(query); // Chama a função de callback com a consulta atual
  };

  return (
    <div className="flex items-center justify-center my-4">
      {/* Caixa de entrada para o texto da pesquisa */}
      <input
        type="text"
        value={query} // O valor da caixa de entrada é controlado pelo estado query
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado query quando o texto muda
        placeholder="Procure por um filme..." // Texto que aparece quando a caixa de entrada está vazia
        className="border p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
      />
      {/* Botão de busca */}
      <button
        onClick={handleSearch} // Chama a função handleSearch quando o botão é clicado
        className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Busque
      </button>
    </div>
  );
};

export default SearchBar;
