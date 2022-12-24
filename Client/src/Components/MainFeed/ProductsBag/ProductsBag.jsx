import React, { useState, useEffect, Suspense } from 'react'
import './ProductsBag.scss'

import ProductCardBag from './ProductCardBag/ProductCardBag'

const ProductsBag = ({ bag = false, products, SetElimindo }) => {

    return (
        <>
            <div className="cards">
                {
                    products.map((item, index) => {
                        if (index > 0) {
                            return <ProductCardBag key={index} clase={"card" + index} product={item} onClick={() => {
                                /*let _text = (".card" + index).toString();
                                document.querySelector(_text).remove();*/
                                SetElimindo(index);
                            }} />
                        }
                    })
                }
            </div>
        </>
    )
}

export default ProductsBag