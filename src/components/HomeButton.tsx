import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import React from 'react';

const HomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); 
  };

  return (
    <button
      onClick={handleGoHome}
      className="absolute top-4 right-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-12 focus:outline-none"
    >
      <FaHome size={22} />
    </button>
  );
};

export default HomeButton;
