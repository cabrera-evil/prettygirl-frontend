import React, { useState, useEffect } from 'react'
import './CategoriesContainer.scss'
import CategoryCard from './CategoryCard/CategoryCard'
import axios from 'axios';
import Loading from '../../Loading/Loading';

const CategoriesContainer = ({handleCategoryClick}) => {
  const [categories, setCategories] = useState([]);
  const [cargado, setCargado] = useState(false);
  const url = "/api/categories";

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setCategories(data.categories);
      setCargado(true);
    }
    getData();
  }, []);

  return (
    <section className="categoriesContainer">
      <h1 className="title">Explora nuestras categorías</h1>
      <div className="categoryCards">
        {cargado ? <>

          {
            categories.map((item, index) => {
              return (
                <CategoryCard key={index} image={item.picture} name={item.name} onClickHandle={() => {handleCategoryClick(item.name)}}/>
              )
            })
          }
        </> : <Loading />}

      </div>
    </section>
  )
}

export default CategoriesContainer