import React from 'react';

const ModalTSuccess = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-bold mb-4">Transaction Status</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 inline-block rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-xl focus:bg-blue-600 focus:shadow-xl focus:outline-none active:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalTSuccess;
