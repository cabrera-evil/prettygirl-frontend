import React, { useState, useEffect } from 'react';
import './Description.scss';
import Label from '../Label/Label';

const Description = ({ title, productDescription, product }) => {
    const [fields, setFields] = useState([]);
    const [combobox, setCombobox] = useState([])
    const [productQuantity, setProductQuantity] = useState(1);

    useEffect(() => {
        console.log(productDescription)
        if (productDescription) {
            setFields(product.description.map((field, index) => {
                return (
                    <Label key={index} type={'text'} text={field} clase={'description'} />
                )
            }));
        } else {
            setFields(product.delivery.map((field, index) => {
                return (
                    <Label key={index} type={'text'} text={field} clase={'description'} />
                )
            }));
            setCombobox(
                <Label key={0} type={'combobox'} name={'delivery'} options={context.product.deliveryOptions} setOption={context.setDeliveryOption} />
            )
        }
    },[])
                        

    return (
        <div className='description-field'>
            <h4>{title}</h4>
            {
                productDescription ?
                    <div className="product-description">
                        {fields}
                    </div> :
                    <div className="delivery-description">
                        
                    </div>
            }
        </div>
    )
}

export default Description