import React, {useState} from 'react'
import { Routes, Route, Navigate} from "react-router-dom";
import './Feed.scss';
import MainFeed from '../../Components/MainFeed/MainFeed';
import Booking from '../../Components/Booking/Booking';
import Bag from '../../Components/MainFeed/Bag/Bag';
import { ProductProvider} from '../../Contexts/ProductContext';

const Feed = () => {

  /* Ocultar categoriesContainer si está en ProductDescription */
  /* Ocultar ambos que está por default si está en booking */

  /* El feed irá cambiando dependiendo de ciertos estados, esto puede ser con <Link/> */

  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path='/' element={<MainFeed />}/> 
          <Route path='/booking' element={<Navigate to='/feed/booking/client-data' />}/>
          <Route path='/booking/*' element={<Booking />}/> 
          <Route path='/bag/*' element={<Bag />}/> 
        </Routes>  
      </ProductProvider>
    </>
  );
};

export default Feed