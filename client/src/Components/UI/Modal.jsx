import React from 'react';

const Modal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-100">
        <div className='flex justify-center items-center gap-5'>
          <div className="flex justify-center mb-4">
            <img className="w-40 h-40 object-contain" src={item.imgSrc} alt={item.name} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
            <p className="text-gray-700 mb-2">Price: {item.price}</p>
            <p className="text-gray-700 mb-2">Description: {item.description}</p>
            <p className="text-gray-700 mb-2">Estimated Delivery: {item.deliveryDate}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={onClose}
            >
              Buy Now
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
