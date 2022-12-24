import React from 'react'
import './Circle.scss'

const Circle = ({step, isActive}) => {
  return (
    <>
        {
            isActive ? <div className="circle colored">{step}</div> : 
            <div className="circle">{step}</div>
        }
    </>
  )
}

export default Circle