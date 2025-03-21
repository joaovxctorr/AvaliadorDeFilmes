import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CommentsProps {
  movieId: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
  const [comment, setComment] = useState<string>('');
  const [isCommentSaved, setIsCommentSaved] = useState<boolean>(false);

  useEffect(() => {
    const storedComment = localStorage.getItem(`comment-${movieId}`);
    if (storedComment) {
      setComment(storedComment);
      setIsCommentSaved(true); // Define como salvo se já existir
    }
  }, [movieId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSaveOrUpdateComment = () => {
    if (!comment.trim()) {
      toast.error('Nenhum comentário inserido!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    localStorage.setItem(`comment-${movieId}`, comment.trim());
    setIsCommentSaved(true); // Atualiza o estado para indicar que o comentário foi salvo

    toast.success(
      isCommentSaved ? 'Comentário atualizado com sucesso!' : 'Comentário salvo com sucesso!',
      {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleDeleteComment = () => {
    localStorage.removeItem(`comment-${movieId}`);
    setComment('');
    setIsCommentSaved(false); // Reseta o estado após excluir o comentário

    toast.success('Comentário excluído com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="mt-6 w-full">
      <h2 className="text-lg font-bold mb-2">Adicionar Comentário</h2>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 mb-2"
        placeholder="Escreva seu comentário aqui..."
      />
      <div className="flex space-x-4 mt-2">
        <button
          onClick={handleSaveOrUpdateComment}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isCommentSaved ? 'Alterar Comentário' : 'Salvar Comentário'}
        </button>
        {isCommentSaved && (
          <button
            onClick={handleDeleteComment}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Excluir Comentário
          </button>
        )}
      </div>
      
    </div>
  );
};

export default Comments;
