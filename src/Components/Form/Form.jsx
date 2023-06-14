import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Form.scss'
import Label from './Label/Label'
import Description from './Description/Description';
import Button from '../Button/Button'
import Combobox from './ComboBox/ComboBox';

/* A form can have different types in this app: login, register, client-data, delivery-info, description*/
/* cancelHandle y continueHandle son parámetros para funciones en caso de que se de click en esos bootones */
const Form = ({ title, formType, formFields, justContinue, cancelHandle, cancelPath, cancelText, continueHandle, continuePath, continueText, Activo }) => {
    const [fields, setFields] = useState([]);
    const [links, setLinks] = useState([]);
    const [Loading, setLoading] = useState(false);

    /* When render just once */
    useEffect(() => {
        if(formFields != undefined){
            /* Get label fields */
            const mappedForm = formFields.map((field, index) => {
                if (field.element === 'label') {
                    return (
                        <Label key={field.key} type={field.type} text={field.text} valueInput={field.value} setValue={field.setValue} InputUse={field.use} clase={field.clase ? field.clase : false}/>
                    )
                }
                if (field.element === 'combobox') {
                    return (
                        <Combobox key={field.key} clase={field.clase} name={field.name} options={field.options} setOption={field.setValue}/>
                    )
                }
                if (field.element === 'react') {
                    return (
                        <div key={2555} className={field.clase}>
                            <div className={field.clase + '-wrapper'}>
                                {field.text}
                            </div>
                        </div>
                    );
                }
                if (field.element === 'text') {
                    return (
                        <a className='location' key={field.key} href='https://goo.gl/maps/BfBLwWiTAGLNAd8d6' target='_blank'><p>Click aquí para abrir ubicación</p></a>
                    );
                }
                if (field.element === 'hr') {
                    return (
                        <hr key={field.key} className={field.clase}/>
                    );
                }
            });

            /* Get links fields */
            const mappedLinks = formFields.map(link => {
                if (link.element === 'link') {
                    return (
                        <Link key={link.key} to={link.path} >
                            <>{link.text}</>
                            {/* <A key={link.key} href={link.href} text={link.text} /> */}
                        </Link>
                        
                    )
                }
            });

            /* Get descriptions */
            const mappedDescription = formFields.map(description => {
                if (description.element === 'product-description' || description.element === 'delivery-description') {
                    return (<>
                        <Description title={description.title} productDescription={description.element === 'product-description' ? true : false}/>
                        <hr />
                    </>
                    )
                }
            });
            setFields(mappedForm);
            setLinks(mappedLinks);
        }

    }, []);

    return (
        <div className='form-container'>
            <form className={formType}>
                <h1>{title}</h1>
                <div className="formFields">
                    {fields}
                </div>
                <div className="actions">
                    <Link to={Activo?continuePath:''}><Button clase='continue' onClick={continueHandle} text={continueText} /></Link>
                    {
                        justContinue ? <></> : <Link to={cancelPath}><Button clase='cancel' onClick={cancelHandle} text={cancelText} /></Link>
                    }
                </div>
                {links.length != 0 ? 
                <div className="links">
                    {links}
                </div> 
                : <></>}
            </form>
        </div>
    )
}

export default Form