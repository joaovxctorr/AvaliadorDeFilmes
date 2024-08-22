import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MovieCardProps {
  id: number; 
  title: string; 
  poster_path: string; 
  rating: number | null; // Avaliação do filme, pode ser null para filmes não avaliados
  onRemove: (id: number) => void; // Função de callback para remover o filme, recebe o ID do filme como argumento
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_path, rating, onRemove }) => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
      <Link href={`/movies/${id}`} className="cursor-pointer">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title} 
          width={192} 
          height={288} 
          className="w-48 h-auto rounded-md mb-4"
        />
      </Link>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {rating !== null && (
        <p className="text-yellow-400">{rating} ★</p> // Exibe a avaliação se não for null
      )}
      <button
        onClick={() => onRemove(id)} // Chama a função onRemove com o ID do filme quando o botão é clicado
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Remove
      </button>
    </div>
  );
};

export default MovieCard;
