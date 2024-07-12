import React, { useState } from 'react';
import './ItemQuantitySelector.css';

const ItemQuantitySelector = ({ initialQuantity, onQuantityChange, onAddToCart }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        onQuantityChange(quantity + 1);
    };

    const handleChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleAddToCartClick = () => {
        onAddToCart(quantity);
        setQuantity(initialQuantity);
    };

    return (
        <div className="item-quantity-selector">
            <button onClick={handleDecrease}>-</button>
            <input type="number" value={quantity} onChange={handleChange} />
            <button onClick={handleIncrease}>+</button>
            <button onClick={handleAddToCartClick}>Agregar al carrito</button>
        </div>
    );
};

export default ItemQuantitySelector;
