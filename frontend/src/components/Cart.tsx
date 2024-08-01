import React from 'react';
import { Box, Heading, Text, Button, VStack, Divider, HStack, IconButton } from '@chakra-ui/react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // const generatePizzaName = (ingredients: { [key: string]: string }) => {
  //   const ingredientNames = Object.values(ingredients);
  //   return ingredientNames.join(', ') + ' Pizza';
  // };

  return (
    <Box p={8} mt={10}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Your Cart
      </Heading>
      {cart.length === 0 ? (
        <Text textAlign="center">Your cart is empty.</Text>
      ) : (
        <VStack spacing={6}>
          {cart.map((item) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="lg" w="100%" maxW="500px">
              <HStack justifyContent="space-between">
                <Box>
                  <Heading as="h2" size="md">{item.pizzaName}</Heading>
                  <Text>Ingredients: {Object.values(item.ingredients).join(', ')}</Text>
                  <Text>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
                </Box>
                <HStack spacing={4}>
                  <IconButton
                    icon={<FaMinus />}
                    aria-label="Decrease quantity"
                    onClick={() => item.id !== undefined && decreaseQuantity(item.id)}
                  />
                  <Text>{item.quantity}</Text>
                  <IconButton
                    icon={<FaPlus />}
                    aria-label="Increase quantity"
                    onClick={() => item.id !== undefined && increaseQuantity(item.id)}
                  />
                  <Button colorScheme="red" onClick={() => item.id !== undefined && removeFromCart(item.id)}>
                    Remove
                  </Button>
                </HStack>
              </HStack>
            </Box>
          ))}
          <Divider />
          <Heading as="h3" size="lg" mt={4}>
            Total: ${totalCost.toFixed(2)}
          </Heading>
          <VStack spacing={4} w="100%">
            <Button colorScheme="blue" onClick={handleGoBack} w="100%">
              Back to Home
            </Button>
            <CheckoutModal />
          </VStack>
        </VStack>
      )}
    </Box>
  );
};

export default CartPage;
