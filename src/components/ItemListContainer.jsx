import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemListContainer.css';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos CSS para react-toastify
import ItemQuantitySelector from './ItemQuantitySelector';
import { FaSearch } from 'react-icons/fa';

function ItemListContainer() {
    const { id } = useParams();
    const { addItemToCart } = useCart();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/products.json'); // Ajustar la ruta a tu archivo JSON de productos
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

    const handleAddToCart = (item, quantity) => {
        addItemToCart({ ...item, quantity });
        toast.success(`${quantity} ${item.name} agregado al carrito!`); // Mostrar la alerta usando react-toastify
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = items.filter(item =>
            (!id || item.categoryId.toString() === id) &&
            item.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
        <div className="item-list-container">
            <h2>Lista de Productos</h2>
            <div className="filter-bar">
                <div className="filter-buttons">
                    <button onClick={() => handleFilterByType('todas')}>Todas</button>
                    <button onClick={() => handleFilterByType('simple')}>Categoría Simple</button>
                    <button onClick={() => handleFilterByType('compleja')}>Categoría Compleja</button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button>
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="item-list">
                {filteredItems.map(item => (
                    <div key={item.id} className="item-card">
                        <Link to={`/item/${item.id}`}>
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>Precio: {item.price}</p>
                            </div>
                        </Link>
                        <ItemQuantitySelector
                            initialQuantity={1}
                            onQuantityChange={(quantity) => console.log(`Cantidad seleccionada: ${quantity}`)}
                            onAddToCart={(quantity) => handleAddToCart(item, quantity)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemListContainer;
