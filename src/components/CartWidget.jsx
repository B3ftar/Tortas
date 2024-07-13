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
        securityCode: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        email: ''
    });
    const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
    const { cartItems, removeItemFromCart, clearCart } = useCart();

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setShowPaymentForm(false);
        setPurchaseConfirmed(false);
        setFormData({
            cardNumber: '',
            expiryDate: '',
            securityCode: '',
            email: ''
        });
        setFormErrors({
            cardNumber: '',
            expiryDate: '',
            securityCode: '',
            email: ''
        });
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
        const errors = {};

        // Validación de número de tarjeta
        if (!validateCardNumber(formData.cardNumber)) {
            errors.cardNumber = 'Número de tarjeta inválido';
        } else {
            errors.cardNumber = '';
        }

        // Validación de fecha de vencimiento (MM/YY)
        if (!validateExpiryDate(formData.expiryDate)) {
            errors.expiryDate = 'Fecha de vencimiento inválida';
        } else {
            errors.expiryDate = '';
        }

        // Validación de código de seguridad (3 o 4 dígitos numéricos)
        if (!validateSecurityCode(formData.securityCode)) {
            errors.securityCode = 'Código de seguridad inválido';
        } else {
            errors.securityCode = '';
        }

        // Validación de correo electrónico
        if (!validateEmail(formData.email)) {
            errors.email = 'Correo electrónico inválido';
        } else {
            errors.email = '';
        }

        // Actualizar estado de errores
        setFormErrors(errors);

        // Si no hay errores, proceder con el pago
        if (Object.values(errors).every(error => error === '')) {
            console.log('Pago confirmado. Procesando compra...');
            console.log('Datos de la compra:', {
                items: cartItems,
                email: formData.email
            });
            setTimeout(() => {
                console.log('Compra exitosa');
                clearCart();
                setShowPaymentForm(false);
                setPurchaseConfirmed(true);
                // Aquí podrías redirigir a una página de confirmación de compra si es necesario
            }, 2000);
        }
    };

    // Función para validar el número de tarjeta usando el algoritmo de Luhn
    const validateCardNumber = (cardNumber) => {
        const cardNumberRegex = /^[0-9]{16}$/;
        return cardNumberRegex.test(cardNumber);
    };

    // Función para validar la fecha de vencimiento (formato MM/YY)
    const validateExpiryDate = (expiryDate) => {
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        return expiryDateRegex.test(expiryDate);
    };

    // Función para validar el código de seguridad (3 o 4 dígitos numéricos)
    const validateSecurityCode = (securityCode) => {
        const securityCodeRegex = /^[0-9]{3,4}$/;
        return securityCodeRegex.test(securityCode);
    };

    // Función para validar el correo electrónico usando expresión regular básica
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
                                            <div className={`form-group ${formErrors.cardNumber ? 'error' : ''}`}>
                                                <label>Número de Tarjeta:</label>
                                                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                                                {formErrors.cardNumber && <p className="error-text">{formErrors.cardNumber}</p>}
                                            </div>
                                            <div className={`form-group ${formErrors.expiryDate ? 'error' : ''}`}>
                                                <label>Fecha de Vencimiento (MM/YY):</label>
                                                <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} />
                                                {formErrors.expiryDate && <p className="error-text">{formErrors.expiryDate}</p>}
                                            </div>
                                            <div className={`form-group ${formErrors.securityCode ? 'error' : ''}`}>
                                                <label>Código de Seguridad:</label>
                                                <input type="text" name="securityCode" value={formData.securityCode} onChange={handleInputChange} />
                                                {formErrors.securityCode && <p className="error-text">{formErrors.securityCode}</p>}
                                            </div>
                                            <div className={`form-group ${formErrors.email ? 'error' : ''}`}>
                                                <label>Correo Electrónico:</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                                {formErrors.email && <p className="error-text">{formErrors.email}</p>}
                                            </div>
                                            <div className="checkout-summary">
                                                <h3>Resumen de la compra</h3>
                                                <ul>
                                                    {cartItems.map(item => (
                                                        <li key={item.id}>
                                                            <p>{item.name} x {item.quantity}</p>
                                                            <p>Total: ${item.price * item.quantity}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </form>
                                        <button onClick={handleConfirmPayment}>Confirmar Pago</button>
                                    </div>
                                ) : (
                                    <div className="checkout-summary">
                                        <h3>Resumen de la compra</h3>
                                        <ul>
                                            {cartItems.map(item => (
                                                <li key={item.id}>
                                                    <p>{item.name} x {item.quantity}</p>
                                                    <p>Total: ${item.price * item.quantity}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={handleProceedToCheckout}>Proceder a Comprar</button>
                                    </div>
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
