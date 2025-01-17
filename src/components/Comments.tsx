import { useState, useEffect } from 'react';

interface CommentsProps {
  movieId: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
  const [comment, setComment] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isCommentSaved, setIsCommentSaved] = useState<boolean>(false); // Controle do estado do comentário salvo

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
      showMessage('Nenhum comentário inserido!', 'error');
      return;
    }
    localStorage.setItem(`comment-${movieId}`, comment.trim());
    setIsCommentSaved(true); // Atualiza o estado para indicar que o comentário foi salvo
    showMessage(isCommentSaved ? 'Comentário atualizado com sucesso!' : 'Comentário salvo com sucesso!', 'success');
  };

  const handleDeleteComment = () => {
    localStorage.removeItem(`comment-${movieId}`);
    setComment('');
    setIsCommentSaved(false); // Reseta o estado após excluir o comentário
    showMessage('Comentário excluído com sucesso!', 'success');
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 2000); 
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

      {message && (
        <div
          className={`mt-2 text-sm ${
            messageType === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Comments;
