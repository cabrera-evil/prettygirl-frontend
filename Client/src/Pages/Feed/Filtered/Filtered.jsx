import React from 'react'
import ProductsContainer from '../../../Components/FilteredProducts/Products';
import { useLocation } from "react-router-dom";

const Body = ({filteredUrl}) => {
    const location = useLocation();
    const url = location.state.filteredUrl;
    
    return (
        <>
            <ProductsContainer filteredUrl={url} />
        </>
    )
}

export default Body