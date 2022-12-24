import React, {useState, createContext} from "react";

const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([{product: 'Vestido', color: 'Azul', size: 'XS', quantity: '1', total: 'US$ 25.00'}]);

    const state = { products, setProducts}

    return (<ProductContext.Provider value={state} {...props}/>)
}

export const useProductContext = () => {
    const context = React.useContext(ProductContext);

    if (!context)
    throw new Error("useConfigContext must be call inside of a ConfigContextProvider component");

    return context;
}

export default ProductContext;