import './Input.scss';
import React, {useState} from 'react'

function Login({type, name, valueInput, handleChange}) {

    return (
        <input type={type} min='1' name={name} value={valueInput} onChange={handleChange} />
    );
}

export default Login;
