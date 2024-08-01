import React from 'react';
import { Box, Flex, Button, Image, Text, useColorModeValue, IconButton, Spacer } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

const Header: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict';
      setUser({});
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const displayName = user?.name || user?.email || 'User';

  return (
    <Box
      bg={bgColor}
      px={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      boxShadow="sm"
      borderBottomWidth={1}
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <RouterLink to="/">
            <Image
              src="/logo.png"
              alt="Pizza Logo"
              boxSize="40px"
              mr={3}
            />
          </RouterLink>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Pizza King
          </Text>
        </Flex>

        <Flex alignItems="center" ml={4}>
          {isAuthenticated && (
            <IconButton
              as={RouterLink}
              to="/cart"
              icon={<FaShoppingCart />}
              variant="outline"
              colorScheme="teal"
              aria-label="Cart"
              mr={4}
            />
          )}
          <Spacer />
          {isAuthenticated ? (
            <>
              <Text mr={4} color={textColor} fontWeight="medium">
                Welcome, {displayName}
              </Text>
              
              <Button
                variant="outline"
                colorScheme="teal"
                leftIcon={<FaSignOutAlt />}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button 
                as={RouterLink}
                to="/order-history"
                variant="solid"
                colorScheme="red"
                ml={2}
              >
                Order History
              </Button>
            </>
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                variant="outline"
                colorScheme="teal"
                leftIcon={<FaSignInAlt />}
                mr={4}
              >
                Log In
              </Button>
              <Button
                as={RouterLink}
                to="/signup"
                variant="solid"
                colorScheme="teal"
                leftIcon={<FaUserPlus />}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
