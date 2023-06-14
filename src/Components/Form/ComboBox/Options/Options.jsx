import React, {useEffect, useState} from 'react'

const Options = ({optionsArray}) => {
    let id = 0;
    
  return (
    <>
        {
            optionsArray.map(opcion => {
                id++;
                return (
                    <option key={id} value={opcion.value}>{opcion.value}</option>
                )
            })
        }
    </>
  )
}

export default Options