import './Button.scss';
import React, { useState } from 'react';

function Button({clase, onClick, text}) {
    return (
        <>
            <button className={clase} onClick={onClick}>{text}</button>
        </>
    );
}

export default Button;
