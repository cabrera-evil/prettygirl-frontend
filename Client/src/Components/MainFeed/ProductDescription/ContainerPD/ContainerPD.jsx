import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link } from "react-router-dom";
import Label from '../../../Form/Label/Label';
import Button from '../../../Button/Button';
import A from '../../../a/a';
import H from '../../../H/H';
import P from '../../../P/P';
import Combobox from '../../../Form/ComboBox/ComboBox';
import Loading from '../../../Loading/Loading';
import './ContainerPD.scss';


/* A form can have different types in this app: login, register, client-data, delivery-info, description*/
/* cancelHandle y continueHandle son parámetros para funciones en caso de que se de click en esos bootones */
const ContainerPD = ({ title, formType, formFields, descriptionFields, justReserva, CrearRevervarPatch, RevervarPatch, setOption}) => {
    const [Datos, setDatos] = useState([]);
    const [Descripcion, setDescription] = useState([]);
    const [combobox, setCombobox] = useState();
    const [Boton, setButton] = useState([]);
    const [img, setImg] = useState([]);
    const [loading, setLoading] = useState(true);

    /* When render just once */
    useEffect(() => {
        setLoading(true)
        if (formType != 'description') {
            /* Get label fields */
            const mappedDatos = formFields.map(field => {
                if (field.element === 'label') {
                    return (
                        <Label key={field.key} text={field.text} InputUse={field.use} clase={field.clase ? field.clase : false} />
                    )
                }
            });

            const mappedCombobox = formFields.map(field => {
                if (field.element === 'combobox') {
                    return (
                        <Combobox key={field.key} clase={'combobox'} name={field.name} options={field.options} setOption={field.setOption} />
                    )
                }
            });

            const mapeedButton = formFields.map(btn => {
                if (btn.element === 'button') {
                    return (
                        <Button key={btn.key} clase={'add-to-bag'} text={btn.text} onClick={btn.onClick} />
                    )
                }
            });
            const mapeedimg = formFields.map(img => {
                if (img.element === 'img') {
                    return (
                        <img key={img.key} src={img.src} />
                    )
                }
            })
            const mappedDescription = formFields.map(field => {
                if (field.element[0] === 'h') {
                    return (
                        <H key={field.key} text={field.text} type={field.element} />
                    )
                }
            });

            setDatos(mappedDatos);
            setCombobox(mappedCombobox);
            setDescription(mappedDescription)
            setButton(mapeedButton);
            setImg(mapeedimg);
        }
        setLoading(false);
    }, [formFields]);

    return (
        <>
            {
                loading ? <Loading></Loading> : <>
                    <div className='container-description'>
                        <figure className='form-img'>
                            {img}
                        </figure>
                        <div className='form'>
                            <div className='form-datos'>
                                {Datos}
                            </div>
                            <div className='form-description'>
                                {Descripcion}
                            </div>
                            <div className='form-combobox'>
                                {combobox}
                            </div>
                            <div className="actions">
                                {
                                    justReserva ? <Link to={RevervarPatch}> {Boton} </Link> : <Link to={CrearRevervarPatch}>{Boton}</Link>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ContainerPD;