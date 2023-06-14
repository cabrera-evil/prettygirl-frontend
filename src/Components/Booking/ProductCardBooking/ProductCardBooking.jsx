import React from 'react'
import './ProductCardBooking.scss'

const ProductCardBooking = ({ item, id = '', setTotal }) => {
  const precio = parseInt(item.amount) * parseInt(item.price);
  return (
    <article className={"product-card " + id}>
      <figure>
        <img src={item.picture} alt={item.name} />
      </figure>
      <p className="product-name">{item.name}</p>
      <p className="product-color">{item.color}</p>
      <p className="product-talla">{item.size}</p>
      <p className="product-price">${item.price}</p>
      <p className="product-amount">Cantidad: {item.amount}</p>
      <p className="product-subtotal">SubTotal: ${precio}</p>
    </article>
  )
}

export default ProductCardBooking