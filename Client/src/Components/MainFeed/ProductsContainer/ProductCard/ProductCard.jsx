import React from 'react'
import './ProductCard.scss'
import { animateScroll as scroll } from 'react-scroll'

const ProductCard = ({image, name, price, onClickHandler, id}) => {

  return (
    <article className={id+" product-card"} onClick={() => {scroll.scrollToTop()}}>
        <figure>
            <img src={image} alt=""/>
        </figure>
        <p className="product-name">{name}</p>
        <p className="product-price">${price}</p>
    </article>
  )
}

export default ProductCard