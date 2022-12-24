import React, { useEffect, useLayoutEffect } from 'react'
import './ActionsBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import AdminBar from '../AdminBar/AdminBar'
import { animateScroll as scroll } from 'react-scroll'
/* Context */
import { useConfigContext } from '../../../Contexts/ConfigContext'
import { useUserContext } from '../../../Contexts/UserContext'

const ActionsBar = ({ isAdmin, showAdminBar, handleSearching, handleAdminBar, handleActionsBar }) => {
    const { isLogged, Logout } = useConfigContext();
    const context = useUserContext();
    const isMovile = useMediaQuery({ query: '(max-width: 900px)' });
    const token = localStorage.getItem("token");

    useLayoutEffect(() => {
    }, [isAdmin]);

    const handleLogOut = () => {
        Logout();
        context.isAdmin();

    }

    return (
        <div className="header-actions-container">
            <div className="header-actions">
                <div className="title">
                    <h2>Pretty Girl</h2>
                    <FontAwesomeIcon icon={faBars} className="bars" onClick={handleActionsBar} />
                </div>
                <figure className="btn-search" onClick={() => {
                    handleSearching(true);
                    handleActionsBar();
                }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <p>Buscar</p>
                </figure>
                {
                    token ?
                        <>
                            {
                                isAdmin ?
                                    <>
                                        <figure className={`btn-admin`} onClick={handleAdminBar}>
                                            <i className="fa-solid fa-wrench"></i>
                                            <p>Administrar</p>
                                        </figure>
                                        {
                                            isMovile && showAdminBar ? <AdminBar handleAdminBar={handleAdminBar} handleActionsBar={handleActionsBar} /> : <></>
                                        }
                                    </> :
                                    <>
                                        <Link to={'feed/bag'}>
                                            <figure className="btn-bag" onClick={() => {
                                                handleActionsBar(); 
                                                scroll.scrollToTop();   
                                            }}>
                                                <i className="fa-solid fa-bag-shopping"></i>
                                                <p>Bolsa</p>
                                            </figure>
                                        </Link>
                                        <Link to={'/'}>
                                            <figure className="btn-logout" onClick={() => {
                                                handleLogOut(); 
                                                handleActionsBar(); 
                                                }}>
                                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                <p>Cerrar sesión</p>
                                            </figure>
                                        </Link>
                                    </>
                            }
                        </> :
                        <Link to={'/login'}>
                            <figure className={`btn-login`} onClick={() => {
                                handleActionsBar(); 
                                scroll.scrollToTop();
                                }}>
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                <p>Iniciar sesión</p>
                            </figure>
                        </Link>
                }
            </div>
            {
                !isMovile && showAdminBar ? <AdminBar handleAdminBar={handleAdminBar} handleActionsBar={handleActionsBar} /> : <></>
            }
        </div>
    )
}

export default ActionsBar