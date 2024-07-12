import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.css'; // Archivo CSS para estilos
import ItemQuantitySelector from './ItemQuantitySelector';
import { useCart } from './CartContext';

function ItemDetailContainer() {
    const { id } = useParams();
    const { addItemToCart } = useCart();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado inicial para la cantidad

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch('/products.json'); // Ajusta la ruta a tu archivo JSON de productos
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const selectedItem = data.find(item => item.id.toString() === id);
                if (selectedItem) {
                    setItem(selectedItem);
                } else {
                    throw new Error('Item not found');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchItem();
    }, [id]);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity); // Actualiza el estado de quantity con el nuevo valor
    };

    const handleAddToCart = () => {
        const quantityInt = parseInt(quantity); // Convierte quantity a entero
        if (!isNaN(quantityInt) && quantityInt >= 1 && item) {
            addItemToCart({
                ...item,
                quantity: quantityInt
            });
            console.log(`${quantityInt} ${item.name} agregado al carrito`);
            // Lógica adicional después de agregar al carrito
        } else {
            console.error('Cantidad no válida');
        }
    };

    if (!item) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="item-detail-container">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>Precio: {item.price}</p>
            <p>Descripción: {item.description}</p>
            <p>Ingredientes: {item.ingredients}</p>
            <ItemQuantitySelector
                initialQuantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
}

export default ItemDetailContainer;
