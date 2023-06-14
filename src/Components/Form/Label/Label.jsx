import React, { useEffect, useState } from 'react';
import './Label.scss';
import Input from './Input/Input';

function label({ type, name, text, valueInput, setValue, InputUse = true, clase = false }) {

    return (
        type !== 'checkbox' ?
            <div className={clase ? clase : 'formLabel'}>
                <label>{text}</label>
                <>
                    {
                        InputUse && type != 'textarea' ? <Input type={type} name={name} valueInput={valueInput} handleChange={(e) => {
                            if (type === 'tel') {
                                if (e.target.value.match('[^0-9]')) e.target.value = (e.target.value).replace(e.target.value.match('[^0-9]')[0], '')
                                if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
                            }
                            setValue(e.target.value)
                        }} /> : <></>
                    }
                    {
                        type === 'textarea' ? <textarea readOnly rows='4' name={name} value={valueInput} /> : <></>
                    }
                </>
            </div> :
            <div className={clase ? clase : 'formLabel'}>
                <label><Input type={type} name={name} handleChange={(e) => {
                    setValue(e.target.checked);
                }} />{text}</label>
            </div>
    );
}

export default label;
