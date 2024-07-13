// NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import './NavBar.css';
import { useCart } from './CartContext'; 

function NavBar() {
    const { cartItems } = useCart();

    // Calcular el número total de elementos en el carrito
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Tortas</h1>
            <ul className="navbar-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Acerca de</Link></li> {/* Añade el enlace a Acerca de */}
                <li><Link to="/services">Servicios</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
            <CartWidget itemCount={cartItemCount} />
        </nav>
    );
}

export default NavBar;
