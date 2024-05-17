
import React from 'react';
import CartWidget from './CartWidget';
import './NavBar.css';

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Tortas</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
      <CartWidget itemCount={5} />
    </header>
  );
}

export default NavBar;
