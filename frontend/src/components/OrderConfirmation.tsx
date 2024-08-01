import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      p={8}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center" p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg="white">
        <Heading as="h1" size="2xl" mb={4} color="green.600">
          Your Order is Placed!
        </Heading>
        <Text fontSize="lg" mb={6}>
          Thank you for your order. Your order ID is <strong>{orderId}</strong>.
        </Text>
        <Button colorScheme="blue" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
