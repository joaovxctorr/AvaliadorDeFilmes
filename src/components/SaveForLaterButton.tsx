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
  const [message, setMessage] = useState<string | null>(null);

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
      showMessage('Removido da lista de "Assistir Mais Tarde"');
    } else {
      localStorage.setItem(`savedForLater-${movieId}`, "true");
      localStorage.setItem(`title-${movieId}`, movieTitle);
      localStorage.setItem(`poster-${movieId}`, moviePosterPath);
      setSavedForLater(true);
      showMessage('Adicionado à lista de "Assistir Mais Tarde"');
    }
  };

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 2000); // Mensagem desaparece após 2 segundos
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
      {message && <div className="text-green-500 text-sm md:text-base mt-2">{message}</div>}
    </div>
  );
};

export default SaveForLaterButton;
