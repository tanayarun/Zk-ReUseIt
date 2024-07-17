import React, { useState } from 'react';
import shoes from '../assets/shoes.png';
import cam from '../assets/cam.png';
import sofa from '../assets/sofa.png';
import Modal from '../Components/UI/Modal.jsx';

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      name: 'Shoes',
      price: '0.25 ETH',
      description: 'High-quality running shoes.',
      deliveryDate: '5-7 business days',
      imgSrc: shoes,
    },
    {
      name: 'DSLR Camera',
      price: '0.75 ETH',
      description: 'High-definition DSLR camera for professional photography.',
      deliveryDate: '7-10 business days',
      imgSrc: cam,
    },
    {
      name: 'Sofa',
      price: '0.5 ETH',
      description: 'Comfortable and stylish sofa.',
      deliveryDate: '10-15 business days',
      imgSrc: sofa,
    }
  ];

  return (
    <div className='bg-black h-full'>
      <div className='text-white flex justify-center items-center pt-5 text-[2rem]'>Shop your fav products</div>
      
      <div className='px-28 text-white text-[2rem] mb-5'>Footwear</div>
      <div className='px-8 flex justify-center items-center gap-12'>
        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[0])}>
          <div>
            <div><img className='w-80' src={shoes} alt="Shoes" /></div>
            <div className='text-white flex justify-center items-center'>Shoes</div>
            <div className='text-white flex justify-center items-center mb-3'>0.25 ETH</div>
          </div>
        </div>

        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[0])}>
          <div>
            <div><img className='w-80' src={shoes} alt="Shoes" /></div>
            <div className='text-white flex justify-center items-center'>Shoes</div>
            <div className='text-white flex justify-center items-center mb-3'>0.25 ETH</div>
          </div>
        </div>

        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[0])}>
          <div>
            <div><img className='w-80' src={shoes} alt="Shoes" /></div>
            <div className='text-white flex justify-center items-center'>Shoes</div>
            <div className='text-white flex justify-center items-center mb-3'>0.25 ETH</div>
          </div>
        </div>
      </div>
      
      <div className='px-28 text-white text-[2rem] mb-5 mt-12'>Electronics</div>
      <div className='px-8 flex justify-center items-center gap-12'>
        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[1])}>
          <div>
            <div><img className='w-80 p-12' src={cam} alt="DSLR Camera" /></div>
            <div className='text-white flex justify-center items-center'>DSLR Camera</div>
            <div className='text-white flex justify-center items-center mb-3'>0.75 ETH</div>
          </div>
        </div>

        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[1])}>
          <div>
            <div><img className='w-80 p-12' src={cam} alt="DSLR Camera" /></div>
            <div className='text-white flex justify-center items-center'>DSLR Camera</div>
            <div className='text-white flex justify-center items-center mb-3'>0.75 ETH</div>
          </div>
        </div>

        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[1])}>
          <div>
            <div><img className='w-80 p-12' src={cam} alt="DSLR Camera" /></div>
            <div className='text-white flex justify-center items-center'>DSLR Camera</div>
            <div className='text-white flex justify-center items-center mb-3'>0.75 ETH</div>
          </div>
        </div>
      </div>
      
      <div className='px-28 text-white text-[2rem] mb-5 mt-12'>Furniture</div>
      <div className='px-8 flex justify-center items-center gap-12'>
        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[2])}>
          <div>
            <div><img className='w-80 p-12' src={sofa} alt="Sofa" /></div>
            <div className='text-white flex justify-center items-center'>Sofa</div>
            <div className='text-white flex justify-center items-center mb-3'>0.5 ETH</div>
          </div>
        </div>

        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[2])}>
          <div>
            <div><img className='w-80 p-12' src={sofa} alt="Sofa" /></div>
            <div className='text-white flex justify-center items-center'>Sofa</div>
            <div className='text-white flex justify-center items-center mb-3'>0.5 ETH</div>
          </div>
        </div>

        <div className='border rounded-xl w-80 cursor-pointer' onClick={() => handleOpenModal(items[2])}>
          <div>
            <div><img className='w-80 p-12' src={sofa} alt="Sofa" /></div>
            <div className='text-white flex justify-center items-center'>Sofa</div>
            <div className='text-white flex justify-center items-center mb-3'>0.5 ETH</div>
          </div>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} />
    </div>
  );
};

export default Shop;
