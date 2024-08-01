import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './Context/AuthContext';
import OrderHistory from './components/OrderHistory';

import { CartProvider } from './Context/CartContext';
import CartPage from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
// I'm creating a new QueryClient instance
const queryClient = new QueryClient();

const App:React.FC = ()=> {
  return (
    // I'm wrapping the entire app with QueryClientProvider to enable React Query
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
      <CartProvider> 
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </Router>
        </CartProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;