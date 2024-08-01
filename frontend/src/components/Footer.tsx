import React from 'react';
import { Box, Container, Stack, SimpleGrid, Text, Link, Input, Button, VStack,  Icon, useColorModeValue } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <Box bg={useColorModeValue('white', 'gray.800')} color={useColorModeValue('gray.700', 'gray.200')} mt="auto" py={10}>
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={8}>
          <Stack align="flex-start">
            <Text fontWeight="bold" fontSize="lg" mb={4}>Pizza King</Text>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>Home</Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>Menu</Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>About Us</Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>Contact Us</Link>
          </Stack>
          <Stack align="flex-start">
            <Text fontWeight="bold" fontSize="lg" mb={4}>Useful Links</Text>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>Privacy Policy</Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>Terms & Conditions</Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>FAQ</Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'red.500' }}>Support</Link>
          </Stack>
          <Stack align="flex-start">
            <Text fontWeight="bold" fontSize="lg" mb={4}>Subscribe to our Newsletter</Text>
            <VStack>
              <Input placeholder="Your email address" bg="gray.100" border={0} _focus={{ bg: 'gray.200' }} />
              <Button colorScheme="red" w="full">Subscribe</Button>
            </VStack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={6} borderTopWidth={1} borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container as={Stack} maxW="6xl" direction={{ base: 'column', md: 'row' }} spacing={4} justify={{ md: 'space-between' }} align={{ md: 'center' }}>
          <Text>© {new Date().getFullYear()} Pizza King. All rights reserved.</Text>
          <Stack direction="row" spacing={6}>
            <Link href="#" isExternal>
              <Icon as={FaFacebook} boxSize={6} _hover={{ color: 'red.500' }} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'red.500' }} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'red.500' }} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaYoutube} boxSize={6} _hover={{ color: 'red.500' }} />
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
