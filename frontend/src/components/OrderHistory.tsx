
import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Spinner, Text, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

// Define the structure of an order item
interface OrderItem {
  id: number;
  pizzaName: string;
  price: string;
  quantity: number;
  ingredients: {
    Base: string;
    Sauce: string;
    Cheese: string;
    Veggies: string;
  };
}

// Definining the structure of an order
interface Order {
  id: number;
  userId: number;
  name: string;
  phone: string;
  address: string;
  items: string; 
  totalPrice: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
    

      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];
        
        if (!token) { 
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:3000/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API response:', response.data);
        setOrders(response.data.orders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  return (
    <VStack spacing={8} align="stretch" mt={150}>
      <Heading as="h1" size="xl" textAlign="center">Order History</Heading>
      <Box p={4}>
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <Table variant="simple">
            <TableCaption placement="top">Your Past Orders</TableCaption>
            <Thead>
              <Tr>
                <Th>
                  <VStack align="stretch">
                    <Text>Order ID</Text>
                    <Text fontWeight="normal" fontSize="sm">Unique identifier</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Name</Text>
                    <Text fontWeight="normal" fontSize="sm">Customer name</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Phone</Text>
                    <Text fontWeight="normal" fontSize="sm">Contact number</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Address</Text>
                    <Text fontWeight="normal" fontSize="sm">Delivery location</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Items</Text>
                    <Text fontWeight="normal" fontSize="sm">Ordered pizzas</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Qty</Text>
                    <Text fontWeight="normal" fontSize="sm">Quantity</Text>
                  </VStack>
                </Th>
                <Th isNumeric>
                  <VStack align="stretch">
                    <Text>Total Price</Text>
                    <Text fontWeight="normal" fontSize="sm">Order cost</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Status</Text>
                    <Text fontWeight="normal" fontSize="sm">Order state</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Created At</Text>
                    <Text fontWeight="normal" fontSize="sm">Order date</Text>
                  </VStack>
                </Th>
                <Th>
                  <VStack align="stretch">
                    <Text>Updated At</Text>
                    <Text fontWeight="normal" fontSize="sm">Last modified</Text>
                  </VStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const parsedItems: OrderItem[] = JSON.parse(order.items);
                  return (
                    <Tr key={order.id}>
                      <Td>{order.id}</Td>
                      <Td>{order.name}</Td>
                      <Td>{order.phone}</Td>
                      <Td>{order.address}</Td>
                      <Td>{parsedItems[0].pizzaName}</Td>
                      <Td>{parsedItems[0].quantity}</Td>
                      <Td isNumeric>{parseFloat(order.totalPrice).toFixed(2)}</Td>
                      <Td>{order.status}</Td>
                      <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                      <Td>{new Date(order.updatedAt).toLocaleString()}</Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={10}>No orders found</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </Box>
    </VStack>
  );
};

export default OrderHistory;