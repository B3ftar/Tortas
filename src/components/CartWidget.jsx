import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Modal from 'react-modal';
import { useCart } from './CartContext'; 
import './CartWidget.css';

Modal.setAppElement('#root'); 

function CartWidget() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        securityCode: ''
    });
    const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
    const { cartItems, removeItemFromCart, clearCart } = useCart(); 

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setShowPaymentForm(false); 
        setPurchaseConfirmed(false); // Reiniciar el estado de compra confirmada al cerrar el modal
    };

    const handleProceedToCheckout = () => {
        setShowPaymentForm(true); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleConfirmPayment = () => {
        // Aquí iría la lógica para confirmar el pago
        console.log('Pago confirmado. Procesando compra...');
        setTimeout(() => {
            console.log('Compra exitosa');
            clearCart(); 
            setShowPaymentForm(false); 
            setPurchaseConfirmed(true); // Establecer la compra como confirmada después de procesar el pago
            // Aquí podrías redirigir a una página de confirmación de compra si es necesario
        }, 2000); // Simulando una espera de 2 segundos antes de limpiar el carrito
    };

    return (
        <div className="cart-widget">
            <FaShoppingCart onClick={openModal} />
            {cartItems.length > 0 && <span className="item-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
            
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
                <h2>Carrito de Compras</h2>
                {purchaseConfirmed ? (
                    <div className="purchase-confirmation">
                        <h3>¡Gracias por tu compra!</h3>
                        <p>Recibirás un correo electrónico con los detalles de tu compra.</p>
                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                ) : (
                    <div>
                        {cartItems.length === 0 ? (
                            <p>No hay elementos en el carrito.</p>
                        ) : (
                            <div>
                                <ul>
                                    {cartItems.map(item => (
                                        <li key={item.id}>
                                            <img src={item.image} alt={item.name} />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>Precio: {item.price}</p>
                                                <p>Cantidad: {item.quantity}</p>
                                                <button onClick={() => removeItemFromCart(item.id)}>Eliminar</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={clearCart}>Vaciar Carrito</button>
                                {showPaymentForm ? (
                                    <div className="payment-form">
                                        <h3>Ingrese los datos de la tarjeta</h3>
                                        <form>
                                            <label>Número de Tarjeta:</label>
                                            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                                            <label>Fecha de Vencimiento:</label>
                                            <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} />
                                            <label>Código de Seguridad:</label>
                                            <input type="text" name="securityCode" value={formData.securityCode} onChange={handleInputChange} />
                                        </form>
                                        <button onClick={handleConfirmPayment}>Confirmar Pago</button>
                                    </div>
                                ) : (
                                    <button onClick={handleProceedToCheckout}>Proceder a Comprar</button>
                                )}
                                <button onClick={closeModal}>Cerrar</button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default CartWidget;
