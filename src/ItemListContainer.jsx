import React from 'react';
import './ItemListContainer.css';
function ItemListContainer() {
    
    const cakes = [
        { id: 1, flavor: 'Chocolate', price: 20.99 },
        { id: 2, flavor: 'Vainilla', price: 18.99 },
        { id: 3, flavor: 'Fresa', price: 22.99 },
       
    ];

    return (
        <div className="item-list-container">
            <h2>Lista de Tortas Disponibles</h2>
            <ul>
                {cakes.map(cake => (
                    <li key={cake.id}>
                        <span>{cake.flavor}</span>
                        <span>{cake.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemListContainer;
