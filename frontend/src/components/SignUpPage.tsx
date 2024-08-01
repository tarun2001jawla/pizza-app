import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast, Flex } from '@chakra-ui/react';
import axios from 'axios';

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const toast = useToast();

  const signUpMutation = useMutation((data: SignUpFormData) =>
    axios.post('http://localhost:3000/users/signup', data)
  );

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUpMutation.mutateAsync(data);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create your account.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box 
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <Heading mb={6}>Sign Up</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input {...register('username', { required: 'Username is required' })} />
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password', { required: 'Password is required', minLength: 6 })} />
              </FormControl>
              <Button type="submit" colorScheme= "red" width="full" isLoading={signUpMutation.isLoading}>
                Sign Up
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUpPage;