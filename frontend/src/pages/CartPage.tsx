import React from 'react';
import { Box, Flex, Heading, VStack, Text, Button, Image, Divider } from '@chakra-ui/react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const dummyCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 10,
    quantity: 1,
    imageUrl: '/images/margherita.jpg',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    price: 12,
    quantity: 2,
    imageUrl: '/images/pepperoni.jpg',
  },
  {
    id: 3,
    name: 'Veggie Pizza',
    price: 11,
    quantity: 1,
    imageUrl: '/images/veggie.jpg',
  },
];

const CartPage: React.FC = () => {
  const totalAmount = dummyCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box maxWidth="800px" mx="auto" mt={20} px={4}>
      <Heading as="h1" mb={8} textAlign="center">
        Your Cart
      </Heading>
      <VStack spacing={4} align="stretch">
        {dummyCartItems.map(item => (
          <Flex key={item.id} align="center" borderWidth="1px" borderRadius="lg" p={4} shadow="sm">
            <Image
              src={item.imageUrl}
              alt={item.name}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
              mr={4}
            />
            <Box flex="1">
              <Text fontSize="xl" fontWeight="bold">
                {item.name}
              </Text>
              <Text fontSize="md">
                Quantity: {item.quantity}
              </Text>
              <Text fontSize="md" fontWeight="semibold">
                Price: ${item.price.toFixed(2)}
              </Text>
            </Box>
          </Flex>
        ))}
        <Divider />
        <Flex justify="space-between" fontSize="xl" fontWeight="bold" p={4}>
          <Text>Total:</Text>
          <Text>${totalAmount.toFixed(2)}</Text>
        </Flex>
        <Button colorScheme="teal" size="lg" width="full" mb={15}>
          Proceed to Checkout
        </Button>
      </VStack>
    </Box>
  );
};

export default CartPage;
