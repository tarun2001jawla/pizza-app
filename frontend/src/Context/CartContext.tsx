import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // I am importing the configurd Axios instance


// I am defining the shpe of a cart item
interface CartItem {
  id?: number; 
  price: number;
  ingredients: { [key: string]: string };
  quantity: number;
  pizzaName: string;
  userId?: number;
}



// I am defining the shpe of the CartContext, which includes methods to manipulate the cart
interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

// I am creating the CartContext to provide cart data and functions to other components
const CartContext = createContext<CartContextProps | undefined>(undefined);

// I am defining the CartProvider component to manage and provide cart state
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // I am initializing the cart state
  

  useEffect(() => {
    fetchCart(); // I am fetching the cart data when the component mounts
  }, []);


   // Add the clearCart function
   const clearCart = () => {
    setCart([]);
  };

  // I am defining the function to fetc cart data from the server
  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get('/cart', { withCredentials: true });
      setCart(response.data); // I am updating the cart state with fetced data
    } catch (error) {
      console.error('Error fetching cart:', error); // I am logging an eror if the fetch fails
    }
  };

  // I am defining the function to add an item to teh cart
  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    try {
      console.log('Adding to cart:', item);
      const response = await axiosInstance.post('/cart', item, { withCredentials: true });
      console.log('Cart item added:', response.data);
      setCart(prevCart => [...prevCart, response.data]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };
  
  // I am defining the function to remove an item from the cart
  const removeFromCart = async (id: number) => {
    try {
      await axiosInstance.delete(`/cart/${id}`);
      setCart(prevCart => prevCart.filter(item => item.id !== id)); // I am updating the cart state after removal
    } catch (error) {
      console.error('Error removing item from cart:', error); // I am logging an eror if removal fails
    }
  };

  // I am defining the function to increase the quantity of an item in the cart
  const increaseQuantity = async (id: number) => {
    try {
      const item = cart.find(item => item.id === id);
      if (item) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        await axiosInstance.put(`/cart/${id}`, updatedItem);
        setCart(prevCart => prevCart.map(item => item.id === id ? updatedItem : item)); // I am updating the cart state with the increasd quantity
        console.log('Increased quantity:', updatedItem); // I am logging the updated item
      }
    } catch (error) {
      console.error('Error increasing quantity:', error); // I am logging an eror if increasing fails
    }
  };

  // I am defining the function to decrease the quantity of an item in the cart
  const decreaseQuantity = async (id: number) => {
    try {
      const item = cart.find(item => item.id === id);
      if (item && item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        await axiosInstance.put(`/cart/${id}`, updatedItem);
        setCart(prevCart => prevCart.map(item => item.id === id ? updatedItem : item)); // I am updating the cart state with the decresed quantity
        console.log('Decreased quantity:', updatedItem); // I am logging the updated item
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error); // I am logging an eror if decreasing fails
    }
  };

  // I am providing the cart state and functions to child components through context
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
    {children}
  </CartContext.Provider>
  );
};

// I am creating a custom hook to use the CartContext easliy in other components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // I am throwing an eror if the context is used outside of CartProvider
  }
  return context;
};
