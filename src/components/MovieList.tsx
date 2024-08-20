import React from 'react';
import Image from 'next/image'; // Importa o componente Image do Next.js

// Definição do tipo Movie, que representa as propriedades básicas de um filme
interface Movie {
  id: number; // Identificador único do filme
  title: string; // Título do filme
  poster_path: string; // Caminho para a imagem do pôster do filme
}

// Definição das propriedades esperadas pelo componente MovieList
interface MovieListProps {
  movies: Movie[]; // Lista de filmes a serem exibidos
  onSelectMovie: (id: number) => void; // Função de callback chamada quando um filme é selecionado, com o ID do filme como argumento
}

// Componente funcional MovieList
const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Mapeia a lista de filmes e gera um bloco para cada um */}
      {movies.map((movie) => (
        <div
          key={movie.id} // Utiliza o ID do filme como chave para otimizar a renderização
          className="cursor-pointer" // Adiciona o cursor pointer para indicar que é clicável
          onClick={() => onSelectMovie(movie.id)} // Chama onSelectMovie com o ID do filme quando o bloco é clicado
        >
          {/* Exibe a imagem do pôster do filme usando o componente Image */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL da imagem do pôster
            alt={movie.title} // Texto alternativo para a imagem
            width={500} // Define a largura da imagem
            height={750} // Define a altura da imagem
            className="w-full h-auto rounded-md" // Estilização para ajustar o tamanho e adicionar bordas arredondadas
          />
          {/* Exibe o título do filme */}
          <h2 className="text-center mt-2">{movie.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
