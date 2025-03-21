import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StarRatingProps {
  movieId: number;
  movieTitle: string;
  moviePosterPath: string;
  initialRating?: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  movieId,
  movieTitle,
  moviePosterPath,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${movieId}`);
    if (savedRating) {
      setRating(parseInt(savedRating, 10));
    }
  }, [movieId]);

  const saveRating = (value: number) => {
    setRating(value);
    localStorage.setItem(`rating-${movieId}`, value.toString());
    localStorage.setItem(`title-${movieId}`, movieTitle);
    localStorage.setItem(`poster-${movieId}`, moviePosterPath);
  };

  const removeRating = () => {
    setRating(0);
    localStorage.removeItem(`rating-${movieId}`);
    localStorage.removeItem(`title-${movieId}`);
    localStorage.removeItem(`poster-${movieId}`);
    toast.info(`Avaliação do filme foi removida`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleMouseEnter = (value: number) => setHoveredRating(value);
  const handleMouseLeave = () => setHoveredRating(null);

  const handleStarClick = (value: number) => {
    if (value === rating) {
      // Remover a avaliação se o valor clicado for o mesmo que o rating atual
      removeRating();
    } else {
      saveRating(value);
      onRatingChange(value);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1 mb-2">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= (hoveredRating ?? rating);
          const starClass = isFilled
            ? 'text-yellow-400 animate-pulse'
            : 'text-gray-300';

          return (
            <span
              key={index}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleStarClick(starValue)}
              className={`cursor-pointer text-2xl md:text-3xl lg:text-4xl transition-transform transform ${starClass}`}
              style={{ transition: 'transform 0.2s ease-in-out' }}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
