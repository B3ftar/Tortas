// src/NavBar.js
import React from 'react';
import CartWidget from './CartWidget';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Tortas</h1>
            <ul className="navbar-links">
                <li><a href="#home">Inicio</a></li>
                <li><a href="#about">Acerca de</a></li>
                <li><a href="#services">Servicios</a></li>
                <li><a href="#contact">Contacto</a></li>
            </ul>
            <CartWidget />
        </nav>
    );
}

export default NavBar;
