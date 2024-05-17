
import React from 'react';
import './Item.css';

function Item({ torta }) {
  return (
    <div className="item">
      <img src={torta.image} alt={torta.name} className="item-image" />
      <h3 className="item-name">{torta.name}</h3>
      <p className="item-description">{torta.description}</p>
      <p className="item-price">${torta.price}</p>
    </div>
  );
}

export default Item;
