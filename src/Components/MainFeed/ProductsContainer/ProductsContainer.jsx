import React, { useState, useEffect, Suspense } from 'react'
import { Link } from "react-router-dom";
import './ProductsContainer.scss'

import ProductCard from './ProductCard/ProductCard'
import axios from "axios";
import Loading from '../../Loading/Loading';

const ProductsContainer = ({ id, title, bag=false }) => {
  const [products, setProducts] = useState([]);
  const [cargado, setCargado] = useState(false);
  let url = "/api/products/";
  
  if(title == 'Recién llegados'){
    url = "/api/products?limit=5";
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setProducts(data.products);
      setCargado(true);
    }
    getData();
  }, []);

  return (
    <section id={id} className="recommended-products">
      {title?<h1 className="title">{title}</h1>:<></>}
      <div className="cards">
        <Suspense>
          {cargado ? <>
            {products.map((item, index) => {
              /* La ruta a la que redirigirá cada producto es ProductDescription */
              return (
                <Link to={{ pathname: '/product/', hash: item._id }} key={index}><ProductCard image={item.picture} name={item.name} price={item.price} /></Link>
              )
            })}</> : <Loading />}
        </Suspense>
      </div>
    </section>
  )
}

export default ProductsContainer