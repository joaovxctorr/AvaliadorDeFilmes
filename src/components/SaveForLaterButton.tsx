import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      localStorage.removeItem(`title-${movieId}`);
      localStorage.removeItem(`poster-${movieId}`);
      setSavedForLater(false);
      toast.success('Removido da lista de "Assistir Mais Tarde"', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      localStorage.setItem(`savedForLater-${movieId}`, "true");
      localStorage.setItem(`title-${movieId}`, movieTitle);
      localStorage.setItem(`poster-${movieId}`, moviePosterPath);
      setSavedForLater(true);
      toast.success('Adicionado à lista de "Assistir Mais Tarde"', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleSaveForLater}
        className={`mt-4 px-4 py-2 rounded-md focus:outline-none transition-colors ${
          savedForLater ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
        aria-pressed={savedForLater}
      >
        {savedForLater ? "Salvo para Assistir Mais Tarde" : "Assistir Mais Tarde"}
      </button>

      {/* Toast Container will be shown globally in your main component */}
    </div>
  );
};

export default SaveForLaterButton;
