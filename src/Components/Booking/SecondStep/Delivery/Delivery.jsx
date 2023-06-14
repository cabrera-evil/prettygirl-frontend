import React, {useState, useEffect} from 'react'
import map from '../../assets/img/map.png';
import './Delivery.scss';

function Delivery() {
    /* Function for making visible some actions for a logged user */
    const [log, setLog] = useState(true);

    return (
        <div className="delivery">
            <div className="map">
                <img src={map} alt="map" />
            </div>
            <div className="form">
                <h1>Información de envío</h1>
                <div className="form__body">
                    <div className="name">
                        <label className="form__label" for="username">Nombre de destinatario</label>
                        <input className="form__input" name="username" />
                    </div>
                    <div className="dui">
                        <label className="form__label" for="dui" >DUI</label>
                        <input className="form__input" name="dui" />
                    </div>
                    <div className="phone">
                        <label className="form__label">Numero de teléfono</label>
                        <input className="form__input" />
                    </div>
                    <div className="email">
                        <label className="form__label" for="email">Correo electrónico</label>
                        <input className="form__input" name="email" />
                    </div>
                    <div className="address">
                        <label className="form__label" for="address">Ubicación de envió</label>
                        <input className="form__input" name="address" />
                    </div>
                    <div className="date">
                        <label className="form__label" for="date">Fecha estimada</label>
                        <input className="form__input" name="date" />
                    </div>
                </div>
                <a href="https://www.google.com">¿Deseas modificar tu información?</a>
                <div className="buttons">
                    <button className="cancel">Cancelar</button>
                    <button className="continue">Continuar</button>
                </div>
            </div>
        </div>
    );
}

export default Delivery;
