import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  rating: number | null;
  onRemove: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_path, rating, onRemove }) => {
  return (
    <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 p-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
      <Link href={`/movies/${id}`} className="cursor-pointer mb-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width={192}
          height={288}
          className="w-48 h-auto rounded-xl shadow-md transform transition duration-500 ease-in-out hover:scale-105"
        />
      </Link>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">{title}</h2>
      {rating !== null && (
        <p className="text-yellow-400 text-lg font-semibold text-center mb-4">
          {rating} ★
        </p>
      )}
      <button
        onClick={() => onRemove(id)}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Remover
      </button>
    </div>
  );
};

export default MovieCard;
