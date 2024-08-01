import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  VStack,
  Select,
  Text,
  Image,
  Grid,
  useColorModeValue,
  Button,
  Center,
  useToast
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Import the useAuth hook

type Category = 'Base' | 'Veggies' | 'Meats' | 'Cheese' | 'Sauce';

interface Ingredient {
  id: number;
  name: string;
  category: Category;
  price: number;
  unit: string;
  description: string;
  image_url: string;
}

const categoryImages = {
  Base: '/base.jpg',
  Veggies: '/veggies.jpg',
  Meats: '/meat.jpg',
  Cheese: '/cheese.jpg',
  Sauce: '/sauce.jpg',
} as { [key: string]: string };

const PizzaCustomizer: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<{[key: string]: string}>({});
  const [totalCost, setTotalCost] = useState<number>(0);
  const toast = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { user } = useAuth(); // Use the useAuth hook to get the user

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get<Ingredient[]>('http://localhost:3000/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Unable to fetch the ingredients:', error);
        toast({
          title: 'Error',
          description: 'Failed to load ingredients. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchIngredients();
  }, [toast]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const cost = Object.keys(selectedIngredients).reduce((total, category) => {
        const ingredient = ingredients.find(ingredient => ingredient.name === selectedIngredients[category]);
        return total + (ingredient ? ingredient.price : 0);
      }, 0);
      setTotalCost(cost);
    };
    calculateTotalCost();
  }, [selectedIngredients, ingredients]);

  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as {[key: string]: Ingredient[]});

  const handleIngredientChange = (category: string, value: string) => {
    setSelectedIngredients(prev => ({...prev, [category]: value}));
  };

  useEffect(() => {
    const allCategoriesSelected = Object.keys(groupedIngredients).every(
      category => selectedIngredients[category]
    );
    setIsFormValid(allCategoriesSelected);
  }, [selectedIngredients, groupedIngredients]);

  const generatePizzaName = (ingredients: { [key: string]: string }) => {
    const ingredientNames = Object.values(ingredients);
    return ingredientNames.join(', ') + ' Pizza';
  };

  const handleAddToCart = async () => {
    try {
      // if (!user || !user.sub) {
      //   throw new Error('User is not authenticated');
      // }
  
      const newCartItem = {
        ingredients: { ...selectedIngredients },
        price: totalCost,
        quantity: 1,
        pizzaName: generatePizzaName(selectedIngredients)
      };
  
      console.log('Adding to cart:', newCartItem); 
  
      await addToCart(newCartItem);
      setSelectedIngredients({});
      setTotalCost(0);
      toast({
        title: 'Pizza added to cart!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/cart');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast({
        title: 'Failed to add pizza to cart',
        description: error instanceof Error ? error.message : 'Please try again or check your login status.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box bg={bgColor} minHeight="100vh" p={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Customize Your Pizza
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {Object.entries(groupedIngredients).map(([category, categoryIngredients]) => (
          <Box 
            key={category} 
            bg="white" 
            p={6} 
            borderRadius="lg" 
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
          >
            <Heading as="h2" size="lg" mb={4}>{category}</Heading>
            <Image 
              src={categoryImages[category] as Category }
              alt={category}
              boxSize="200px"
              objectFit="cover"
              borderRadius="md"
              mb={4}
            />
            <VStack spacing={4} align="stretch">
              <Select 
                placeholder={`Choose your ${category.toLowerCase()}`}
                value={selectedIngredients[category] || ''}
                onChange={(e) => handleIngredientChange(category, e.target.value)}
                isRequired
              >
                {categoryIngredients.map(ingredient => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name} - ${ingredient.price}/{ingredient.unit}
                  </option>
                ))}
              </Select>
              {selectedIngredients[category] && (
                <Box>
                  <Text mt={2} fontWeight="bold">
                    {selectedIngredients[category]}
                  </Text>
                  <Text fontSize="sm">
                    {categoryIngredients.find(i => i.name === selectedIngredients[category])?.description}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        ))}
      </Grid>
      <Center mt={8}>
        <Button
          leftIcon={<FaShoppingCart />}
          colorScheme="blue"
          size="lg"
          onClick={handleAddToCart}
          isDisabled={!isFormValid || !user}
        >
          Add to Cart (${totalCost.toFixed(2)})
        </Button>
      </Center>
    </Box>
  );
};

export default PizzaCustomizer;