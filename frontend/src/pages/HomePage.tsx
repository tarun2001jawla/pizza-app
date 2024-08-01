import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PizzaCustomizer from '../components/PizzaCustomizer';

const HomePage: React.FC = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
    
      <Box flex="1" p={4} mt={10}>
        <PizzaCustomizer/>
       
      </Box>
      <Footer />
    </Flex>
  );
};

export default HomePage;
