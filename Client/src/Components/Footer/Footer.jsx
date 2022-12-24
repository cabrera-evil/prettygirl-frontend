import React from "react";
import logo from "../../assets/img/logo.jpg"
import './Footer.scss';
import Products from "./Products/Products";
import Links from "./Links/Links";
import ContactInformation from "./ContactInformation/ContactInformation";

const Footer = () => {
    return (
        <footer>
        <div className="footer-information">
            <div className="footer-logo">
                <figure>
                    <img src={logo} alt="logo" />
                </figure>
                <h2>Pretty Girl</h2>
            </div>
            <Products />
            <ContactInformation />
        </div>
        <hr/>
        <div className="footer-social-media">
            <figure className="icon">
                <a href="https://www.instagram.com/prettygirl_sv/" target="_blank">
                    <i className="fa fa-brands fa-instagram fa-2x"></i>
                </a>
            </figure>
            <figure className="icon">
                {/* Aquí el enlace debe dirigir a un chat directo con el número de la empresa */}
                <a href="https://web.whatsapp.com" target="_blank">
                    <i className=" fa fa-brands fa-whatsapp fa-2x"></i>
                </a>
            </figure>
            
        </div>
    </footer>
    );
};

export default Footer;