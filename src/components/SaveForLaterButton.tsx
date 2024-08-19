import React, { useEffect, useState } from 'react';

interface SaveForLaterButtonProps {
  movieId: number;
  movieTitle: string;
  moviePosterPath: string;
}

const SaveForLaterButton: React.FC<SaveForLaterButtonProps> = ({
  movieId,
  movieTitle,
  moviePosterPath,
}) => {
  const [savedForLater, setSavedForLater] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem(`savedForLater-${movieId}`);
    setSavedForLater(!!saved);
  }, [movieId]);

  const handleSaveForLater = () => {
    if (savedForLater) {
      localStorage.removeItem(`savedForLater-${movieId}`);
      setSavedForLater(false);
    } else {
      localStorage.setItem(`savedForLater-${movieId}`, "true");
      localStorage.setItem(`title-${movieId}`, movieTitle);
      localStorage.setItem(`poster-${movieId}`, moviePosterPath);
      setSavedForLater(true);
    }
  };

  return (
    <button
      onClick={handleSaveForLater}
      className={`mt-4 px-4 py-2 ${savedForLater ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-md`}
    >
      {savedForLater ? "Salvo para Assistir Mais Tarde" : "Assistir Mais Tarde"}
    </button>
  );
};

export default SaveForLaterButton;
