import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as needed
import { parseJwt } from '../utils/jwt';
interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const loginMutation = useMutation(async (data: LoginFormData) => {
    const response = await axios.post('http://localhost:3000/users/login', data, {
      withCredentials: true
    });
    console.log({"data":response.data})
    return response.data;
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      console.log('Login response:', response);

      if (response.token) {
        console.log({response})
        document.cookie = `jwt=${response.token}; path=/; Secure; SameSite=Strict`;
        const decoded = parseJwt(response.token);
        localStorage.setItem("jwt", response.token)
        setUser({ name: decoded.name }); 
        setIsAuthenticated(true);

        toast({
          title: 'Login successful.',
          description: "You're now logged in!",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/');
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed.',
        description: 'Invalid email or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg">
        <Box p={4}>
          <Heading mb={6}>Login</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
                {errors.email && <Box color="red.500">{errors.email.message}</Box>}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password', { required: 'Password is required' })} />
                {errors.password && <Box color="red.500">{errors.password.message}</Box>}
              </FormControl>
              <Button type="submit" colorScheme="red" width="full" isLoading={loginMutation.isLoading}>
                Log In
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
