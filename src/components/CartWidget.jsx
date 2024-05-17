
import React from 'react';
import cartImage from '../assets/cart.png';
import './CartWidget.css';

function CartWidget() {
  return (
    <div className="cart-widget">
      <img src={cartImage} alt="Cart" className="cart-icon" />
    </div>
  );
}

export default CartWidget;
