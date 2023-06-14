import React, { useState, useEffect } from 'react'
import './MainFeed.scss'
import { Routes, Route } from "react-router-dom";
import CategoriesContainer from './CategoriesContainer/CategoriesContainer'
import ProductsContainer from './ProductsContainer/ProductsContainer'
import { useNavigate } from 'react-router-dom';
import { useConfigContext } from '../../Contexts/ConfigContext'
import { animateScroll as scroll } from 'react-scroll';

const Body = () => {
  const context = useConfigContext();
  const [categoryClicked, setCategoryClicked] = useState('');

  // Navigate to products filtered by selected category
  const navigate = useNavigate();
  const url = `/api/products?category=${categoryClicked}`;

  const handleCategoryClick = (value) => {
    setCategoryClicked(value);
  }

  useEffect(() => {
    // Verify if categoryClicked is not empty
    if(categoryClicked !== '') {
      navigate('/feed/filtered', {
        state: {
          filteredUrl: url
        }
      });
    }
  }, [categoryClicked])


  return (
    <div className='main-feed-container' onClick={() => {scroll.scrollToTop()}}>
      <CategoriesContainer handleCategoryClick={handleCategoryClick} />
      <ProductsContainer id={'arrived'} title={'Recién llegados'} />
      {
        context.isLogged ? <ProductsContainer id='recommended' title={'Recomendados para ti'} /> : <></>
      }
    </div>
  )
}

export default Body