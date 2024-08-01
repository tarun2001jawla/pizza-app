import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  VStack,
  useToast,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseJwt } from "../utils/jwt";

const CheckoutModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { cart, clearCart } = useCart();

  const navigate = useNavigate();
  const toast = useToast();

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address) {
      toast({
        title: "Please fill all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      toast({
        title: "User not authenticated.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let userId;
    try {
      const decoded: any = parseJwt(token);
      userId = decoded.sub;
    } catch (error) {
      toast({
        title: "Invalid token.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const orderId = Math.floor(Math.random() * 1000000);
    const orderData = {
      name,
      phone,
      address,
      userId,
      items: cart.map((item) => ({
        id: item.id,
        pizzaName: item.pizzaName,
        price: item.price,
        quantity: item.quantity,
        ingredients: item.ingredients,
      })),
      totalPrice: totalCost,
      status: "pending",
    };

    try {
      const token = localStorage.getItem("jwt");
      await axios.post("http://localhost:3000/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast({
        title: "Order placed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast({
        title: "Failed to place order.",
        description: "There was an error placing your order. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Proceed to Checkout
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          <ModalHeader>Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bg="gray.50"
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  bg="gray.50"
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  bg="gray.50"
                />
              </FormControl>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Order Summary:
                </Text>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Pizza</Th>
                      <Th>Ingredients</Th>
                      <Th isNumeric>Quantity</Th>
                      <Th isNumeric>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cart.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.pizzaName}</Td>
                        <Td>{Object.values(item.ingredients).join(", ")}</Td>
                        <Td isNumeric>{item.quantity}</Td>
                        <Td isNumeric>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Text fontWeight="bold" mt={2}>
                  Total Price: ${totalCost.toFixed(2)}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckoutModal;
