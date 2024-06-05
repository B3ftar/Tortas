import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import ItemListContainer from './ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer';
import Footer from './Footer';
import { CartProvider } from './CartContext';

function App() {
    return (
        <Router>
            <div className="App">
                <CartProvider> {}
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<ItemListContainer />} />
                        <Route path="/category/:id" element={<ItemListContainer />} />
                        <Route path="/item/:id" element={<ItemDetailContainer />} />
                    </Routes>
                    <Footer />
                </CartProvider>
            </div>
        </Router>
    );
}

export default App;
