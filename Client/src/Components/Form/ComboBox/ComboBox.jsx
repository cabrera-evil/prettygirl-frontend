import { useEffect, useState } from "react";
import './ComboBox.scss'
import Options from "./Options/Options";


function Combobox({ clase, name, options, setOption, selectedIndex, Comboboxindex, setIndex, update }) {


    const handleReusableType = (e) => {
        e.target.selectedIndex = 0;
    }
     const handleIndex = (e) => {
        if (Comboboxindex == 1) {
            selectedIndex.c1.index = e.target.value;
            setIndex(selectedIndex);
        }
        else if (Comboboxindex == 2) {
            selectedIndex.c2.index = e.target.value;
            setIndex(selectedIndex);
        }
        update(true);
    } 

    return (
        <div className={clase} >
            <select name={name} value={Comboboxindex == 1 ? selectedIndex.c1.index : selectedIndex.c2.index} onChange={(e) => {
                setOption(e.target.value);
                name === 'reusable' && handleReusableType(e);
                console.log('changing');
                if(clase === 'save-index') handleIndex(e);
            }
            }>
                <Options optionsArray={options} />
            </select>
        </div>
    );
}

export default Combobox;
