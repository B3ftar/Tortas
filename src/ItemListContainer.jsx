import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemListContainer.css';
import { useCart } from './CartContext'; 

function ItemListContainer() {
    const { id } = useParams();
    const { addItemToCart } = useCart(); // Obtener la función addItemToCart del contexto del carrito
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/products.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
                setFilteredItems(data.filter(item => !id || item.categoryId.toString() === id));
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchItems();
    }, [id]);

    const handleFilterByType = (type) => {
        let filtered = items.filter(item => !id || item.categoryId.toString() === id);
        if (type !== 'todas') {
            filtered = filtered.filter(item => item.type === type);
        }
        setFilteredItems(filtered);
    };

    return (
        <div className="item-list-container">
            <h2>Lista de Productos</h2>
            {}
            <div className="filter-buttons">
                <button onClick={() => handleFilterByType('todas')}>Todas</button>
                <button onClick={() => handleFilterByType('simple')}>Categoría Simple</button>
                <button onClick={() => handleFilterByType('compleja')}>Categoría Compleja</button>
                {}
            </div>
            <div className="item-list">
                {filteredItems.map(item => (
                    <div key={item.id} className="item-card">
                        <Link to={`/item/${item.id}`}>
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Precio: {item.price}</p>
                            </div>
                        </Link>
                        <button onClick={() => addItemToCart(item)}>Comprar</button> {/* Usar addItemToCart del contexto del carrito */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemListContainer;
