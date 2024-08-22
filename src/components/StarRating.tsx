import React, { useState, useEffect } from 'react';

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
  const [message, setMessage] = useState<string | null>(null);

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
    setMessage('Avaliação salva!');
    setTimeout(() => setMessage(null), 2000);
  };

  const handleMouseEnter = (value: number) => setHoveredRating(value);
  const handleMouseLeave = () => setHoveredRating(null);
  const handleStarClick = (value: number) => {
    saveRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1 mb-2">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= (hoveredRating ?? rating);

          return (
            <span
              key={index}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleStarClick(starValue)}
              className={`cursor-pointer text-2xl md:text-3xl lg:text-4xl ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          );
        })}
      </div>
      {message && <div className="text-green-500 text-sm md:text-base">{message}</div>}
    </div>
  );
};

export default StarRating;
