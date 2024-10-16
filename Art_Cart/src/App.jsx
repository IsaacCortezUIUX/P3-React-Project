import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext'; // Import the provider
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import ReceiptPage from './components/ReceiptPage'; // Import ReceiptPage

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/receipt" element={<ReceiptPage />} /> {/* Add ReceiptPage Route */}
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
