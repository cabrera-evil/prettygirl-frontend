import React, { useEffect, useLayoutEffect, useState } from 'react'
import Button from '../../../Button/Button';
import './ProductCardBag.scss';
const ProductCardBag = ({ product, onClick, clase }) => {
  const [Product, setProduct] = useState(product);
  const [Value, setValue] = useState(product.amount);

  useEffect(() => {
    Product.amount = Value;
  }, [Value]);

  return (
    <article className={"product-card "+clase}>
      <Button clase={'delete'} onClick={onClick} text={
        <>
          <figure className='delete'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.8 19.7q-.625 0-1.062-.438Q6.3 18.825 6.3 18.2V6h-1v-.7H9v-.7h6v.7h3.7V6h-1v12.2q0 .65-.425 1.075-.425.425-1.075.425ZM17 6H7v12.2q0 .35.225.575Q7.45 19 7.8 19h8.4q.3 0 .55-.25.25-.25.25-.55Zm-6.95 11h.7V8h-.7Zm3.2 0h.7V8h-.7ZM7 6V19 18.2Z" /></svg>
          </figure>
        </>
      } ></Button>
      <figure>
        <img src={Product.picture} alt="" />
      </figure>
      <p className="product-name">{Product.name}</p>
      <p className="product-color">{Product.color}</p>
      <p className="product-talla">{Product.size}</p>
      <p className="product-price">${Product.price}</p>
      <p className='product-amount'>Cantidad: <input type='number' name={'cantidad'} value={Value} min={1} max={Product.max} onChange={(e) => {
        Product.SetValue(e.target.value);
        setValue(e.target.value);
        Product.SetID(Product.id)
        console.log(Product.id)
      }} ></input> </p>
    </article>
  )
}

export default ProductCardBag