import React from 'react'
import './NotFound.scss'

const NotFound = () => {
  return (
    <section className='not-found'>
        <div className="not-found-message">
            <h1>ERROR 404</h1>
            <div className='information-message'>
                <figure>
                    <img src="https://res.cloudinary.com/cabrera-evil/image/upload/v1669599268/prettygirl-api/default/box_bjknfp.png" alt="empty" />
                </figure>
                <h1>Página no encontrada</h1>
            </div> 
        </div>
    </section>
  )
}

export default NotFound