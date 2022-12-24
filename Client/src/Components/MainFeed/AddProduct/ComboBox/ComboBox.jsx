import React from "react";
import './ComboBox.scss'
import Options from "./Options/Options";

function Combobox({ clase, name, options, setOption }) {
    const handleReusableType = (e) => {
        e.target.selectedIndex = 0;
    }

    return (
        <div className={clase} >
            <select name={name} onChange={(e) => {
                setOption(e.target.value);
                name === 'reusable' && handleReusableType(e);
                console.log('changing');
            }
            }>
                <Options optionsArray={options}/>  
            </select>
        </div>
    );
}

export default Combobox;