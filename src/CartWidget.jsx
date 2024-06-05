import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './CartWidget.css';

function CartWidget({ itemCount }) {
    return (
        <div className="cart-widget">
            <FaShoppingCart />
            {itemCount > 0 && <span className="item-count">{itemCount}</span>}
        </div>
    );
}

export default CartWidget;
