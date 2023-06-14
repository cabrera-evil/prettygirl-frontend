import './Product.scss';
import React, { useEffect, useLayoutEffect } from 'react';
import ProductDescription from '../../Components/MainFeed/ProductDescription/ProductDescription';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Product() {
    const ruta = useLocation();
    const [id, setID] = useState((ruta.hash.replace('#', '')).length > 0 ? ruta.hash.replace('#', '') : false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            navigate('/feed');
        }
        setID((ruta.hash.replace('#', '')).length > 0 ? ruta.hash.replace('#', '') : false);
        
    }, [ruta.hash])

    return (
        <>
            {id ? <ProductDescription id={id} /> : <></>}
        </>
    );
}

export default Product;

