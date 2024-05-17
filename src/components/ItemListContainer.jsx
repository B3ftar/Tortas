
import React from 'react';
import Item from './Item';
import './ItemListContainer.css';

const tortas = [
  {
    id: 1,
    name: 'Torta de Chocolate',
    description: 'Deliciosa torta de chocolate con relleno de crema.',
    price: 10.00,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Torta de Vainilla',
    description: 'Esponjosa torta de vainilla con glaseado de vainilla.',
    price: 12.00,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Torta de Fresa',
    description: 'Torta de fresa fresca con relleno de fresa.',
    price: 15.00,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Torta de Limón',
    description: 'Refrescante torta de limón con glaseado de limón.',
    price: 14.00,
    image: 'https://via.placeholder.com/150'
  }
];

function ItemListContainer() {
  return (
    <div className="item-list-container">
      <h2>¡Bienvenido a nuestra tienda de tortas!</h2>
      <div className="item-list">
        {tortas.map(torta => (
          <Item key={torta.id} torta={torta} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
