import React from 'react';
import Link from 'next/link';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  rating: number | null; // Permite null para filmes não avaliados
  onRemove: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_path, rating, onRemove }) => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
      <Link href={`/movies/${id}`} className="cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-48 h-auto rounded-md mb-4"
        />
      </Link>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {rating !== null && (
        <p className="text-yellow-400">{rating} ★</p>
      )}
      <button
        onClick={() => onRemove(id)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Remove
      </button>
    </div>
  );
};

export default MovieCard;
