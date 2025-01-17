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
      className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
    >
      <FaHome size={24} />
    </button>
  );
};

export default HomeButton;
