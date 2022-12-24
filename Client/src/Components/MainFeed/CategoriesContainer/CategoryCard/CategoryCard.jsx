import React, { useState } from 'react'
import './CategoryCard.scss'
import { useConfigContext } from '../../../../Contexts/ConfigContext'
import { Link } from 'react-scroll'

const CategoryCard = ({ image, name, onClickHandle }) => {
  const loggedContext = useConfigContext();

  return (
    <article className="category-card" onClick={onClickHandle}>
      <figure>
        <img src={image} alt="" />
        <div className="hover-container">
          <div className="hover">
            <p>{name}</p>
          </div>
        </div>
      </figure>
    </article>
  )
}

export default CategoryCard