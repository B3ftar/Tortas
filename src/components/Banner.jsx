// src/components/Banner.jsx

import React from 'react';
import './Banner.css'; // Estilos opcionales para el banner

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-content">
                <h1>Bienvenido a nuestra página de inicio</h1>
                <p>Descubre nuestras últimas ofertas y productos destacados.</p>
                {/* Puedes agregar botones, enlaces u otros elementos según sea necesario */}
            </div>
        </div>
    );
}

export default Banner;
