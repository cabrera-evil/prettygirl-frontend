import React, {useState} from 'react'
import './AdminBar.scss'
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import {useConfigContext} from '../../../Contexts/ConfigContext'

const AdminBar = ({handleAdminBar, handleActionsBar}) => {
    const {Logout} = useConfigContext();
    const [productClicked, setProductClicked] = useState(false);
    const isMovile = useMediaQuery({query: '(max-width: 900px)'});

    const handleLogOut = () => {
        Logout();
    }

    const handleProductClicked = () => {
        productClicked ? setProductClicked(false) : setProductClicked(true);
    }

    return (
        <div className='admin-actions-container'>
            <div className="admin-actions">
                <hr/>
                {
                    isMovile ? <></> : 
                    <figure className={`btn-admin`} onClick={handleAdminBar}>
                        <i className="fa-solid fa-wrench"></i>
                        <p>Administrar</p>
                    </figure>
                }
                <figure className={`btn-products`} onClick={handleProductClicked}>
                    <i className="fa-solid fa-shirt"></i>
                    <p>Productos</p>
                </figure>
                {
                    productClicked ? 
                    <div className="products-actions">
                        <Link to={'/add-product'}>
                            <figure className={`btn-products`} onClick={() => { isMovile ? handleActionsBar() : handleAdminBar()}}>
                                <i className="fa-solid fa-plus"></i>
                                <p>Agregar</p>
                            </figure>
                        </Link>
                        <Link>
                            <figure className={`btn-products`} onClick={() => { isMovile ? handleActionsBar() : handleAdminBar()}}>
                                <i className="fa-solid fa-pen-to-square"></i>
                                <p>Editar</p>
                            </figure>
                        </Link>
                    </div> : <></>
                }
                <Link>
                    <figure className={`btn-categories`} onClick={() => { isMovile ? handleActionsBar() : handleAdminBar()}}>
                        <i className="fa-solid fa-cubes-stacked"></i>
                        <p>Categorías</p>
                    </figure>
                </Link>
                <Link>
                    <figure className={`btn-bookings`} onClick={() => { isMovile ? handleActionsBar() : handleAdminBar()}}>
                        <i className="fa-regular fa-bookmark"></i>
                        <p>Reservas</p>
                    </figure>
                </Link>
                <Link to={'/'}>
                    <figure onClick={() => {handleLogOut(); handleActionsBar(); handleAdminBar();}} className="btn-logout">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <p>Cerrar sesión</p>
                    </figure>
                </Link>
            </div>
        </div>
    )
}

export default AdminBar