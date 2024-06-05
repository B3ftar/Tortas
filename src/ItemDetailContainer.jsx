// src/ItemDetailContainer.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch('/products.json');
            const data = await response.json();
            setItem(data.find(item => item.id.toString() === id));
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="item-detail-container">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>Precio: {item.price}</p>
            <p>Descripción: {item.description}</p>
        </div>
    );
}

export default ItemDetailContainer;
