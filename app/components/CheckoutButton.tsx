import React from 'react';

const CheckoutButton: React.FC = () => {
  return (
    <button
      className="
        bg-green-500 
        text-white 
        font-semibold 
        py-3 px-6 
        rounded-lg 
        shadow-lg 
        transition-transform 
        duration-300 
        transform 
        hover:scale-105 
        focus:outline-none 
        focus:ring-4 
        focus:ring-green-300
      "
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
