import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Banner from './components/Banner'; // Importa el componente de Banner
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="App">
                <CartProvider>
                    <NavBar />
                    <Routes>
                        {/* Ruta principal */}
                        <Route path="/" element={<>
                            <Banner />
                            <ItemListContainer />
                        </>} />
                        {/* Ruta para mostrar la lista de productos por categoría */}
                        <Route path="/category/:id" element={<ItemListContainer />} />
                        {/* Ruta para mostrar los detalles de un producto */}
                        <Route path="/item/:id" element={<ItemDetailContainer />} />
                    </Routes>
                    <Footer />
                </CartProvider>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            </div>
        </Router>
    );
}

export default App;
