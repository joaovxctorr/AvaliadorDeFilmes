import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center p-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-7xl font-extrabold text-red-600 dark:text-red-400 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1>
        <p className="text-xl text-gray-800 dark:text-gray-300 mb-6">
          Ops! A página que você procura não foi encontrada.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Voltar para a página inicial
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Se o problema persistir, entre em contato com o suporte.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
