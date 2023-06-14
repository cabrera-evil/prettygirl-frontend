import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Header.scss";
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"
import SearchModal from "./SearchModal/SearchModal";
import ActionsBar from "./ActionsBar/ActionsBar";
import { useConfigContext } from "../../Contexts/ConfigContext";
import { useUserContext } from "../../Contexts/UserContext";
import { animateScroll as scroll } from 'react-scroll'

const Header = () => {
    const [showActions, setShowActions] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const [showAdminBar, setShowAdminBar] = useState(false);
    const isMovile = useMediaQuery({ query: '(max-width: 900px)' });
    const role = localStorage.getItem("role");
    const context = useUserContext();
    const loggedContext = useConfigContext();
    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(context.admin);
    }, [context.admin])
    useEffect(() => {
        isMovile ? setShowActions(false) : setShowActions(true);
    }, [isMovile]);

    const handleAdminBar = () => {
        showAdminBar ? setShowAdminBar(false) : setShowAdminBar(true);
    }

    const handleActionsBar = () => {
        isMovile && showActions ? setShowActions(false) : setShowActions(true);
    }

    return (
        <header>
            <div className="header-title-categories">
                <Link to={'/feed'}><h2 onClick={() => { scroll.scrollToTop(); }}>Pretty Girl</h2> </Link>
                <div className="categories">
                    {
                        loggedContext.isLogged ?
                            <>
                                <h3 onClick={(e) => {
                                    {
                                        // Reload page if we are in the same page
                                        if (window.location.pathname === '/feed/filtered')
                                            window.location.reload();
                                        // Navigate to the filtered page
                                        navigate('/feed/filtered', {
                                            state: {
                                                filteredUrl: "/api/products?gender=Masculino&gender=Unisex"
                                            }
                                        })
                                    }
                                }}>Hombre</h3>
                                <h3 onClick={(e) => {
                                    {
                                        // Reload page if we are in the same page
                                        if (window.location.pathname === '/feed/filtered')
                                            window.location.reload();
                                        // Navigate to the filtered page
                                        navigate('/feed/filtered', {
                                            state: {
                                                filteredUrl: "/api/products?gender=Femenino&gender=Unisex"
                                            }
                                        })
                                    }
                                }}>Mujer</h3>
                            </> :
                            <>
                                <h3 onClick={(e) => {
                                    {
                                        // Reload page if we are in the same page
                                        if (window.location.pathname === '/feed/filtered')
                                            window.location.reload();
                                        // Navigate to the filtered page
                                        navigate('/feed/filtered', {
                                            state: {
                                                filteredUrl: "/api/products?gender=Masculino&gender=Unisex"
                                            }
                                        })
                                    }
                                }}>Hombre</h3>
                                <h3 onClick={(e) => {
                                    {
                                        // Reload page if we are in the same page
                                        if (window.location.pathname === '/feed/filtered')
                                            window.location.reload();
                                        // Navigate to the filtered page
                                        navigate('/feed/filtered', {
                                            state: {
                                                filteredUrl: "/api/products?gender=Femenino&gender=Unisex"
                                            }
                                        })
                                    }
                                }}>Mujer</h3>
                            </>
                    }
                </div>
            </div>
            {
                showActions ?
                    <ActionsBar isAdmin={isAdmin} showAdminBar={showAdminBar} handleSearching={setIsSearching} handleAdminBar={handleAdminBar} handleActionsBar={handleActionsBar} />
                    : <></>
            }
            <FontAwesomeIcon icon={faBars} className="bars" onClick={handleActionsBar} onChange={handleActionsBar} />
            {/* open the modal if the user is searching */}
            {
                isSearching ? <SearchModal cancelSearch={setIsSearching} /> : <></>
            }
        </header>
    )
}

export default Header