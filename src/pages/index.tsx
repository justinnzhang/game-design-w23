import Head from 'next/head';
import {
  Button,
  Box,
  Container,
  Stack,
  Text,
  Heading,
  Flex,
  Spacer,
  Grid,
  GridItem,
  SimpleGrid,
  Image,
  Divider,
  Center,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';

import { IoArrowForward, IoLink } from 'react-icons/io5';

import { CONTRIBUTORS_LIST, TECH_STACK_LIST } from '../constants';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Coffee.io Home</title>
        <meta
          name='description'
          content='Prototype by Justin Zhang for Game Design, UWO W23'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        w='100vw'
        h='100vh'
        bgGradient='linear(to-br, yellow.50 0%, purple.100 25%, blue.100 50%)'
      >
        <Container
          maxW='container.lg'
          h='$100vh'
          p={0}
          bg='white'
          position='relative'
          overflowY='scroll'
        >
          <Box
            p={4}
            bg='blue.100'
            as={Flex}
            alignItems='center'
            id='heading'
            position='-webkit-sticky'
          >
            <Text fontWeight='medium' fontSize='sm' color='blue.800'>
              Coffee.io
            </Text>
            <Spacer />
            <Button as={Link} href='/home' colorScheme='blue' size='sm'>
              Play
            </Button>
          </Box>
          <Stack>
            <Flex p={8} alignItems='center'>
              <Heading
                size='2xl'
                bgGradient='linear(to-br, blue.100, blue.400, blue.500)'
                bgClip='text'
              >
                Coffee.io
              </Heading>
              <Spacer />
              <Image
                src='/static/pixel-art-coffee.avif'
                alt='Coffee.io Logo'
                w='3rem'
              />
            </Flex>
            <SimpleGrid gap={16} p={8} columns={2} color='gray.500'>
              <Stack spacing={8}>
                <Text>
                  Coffe.io - the ultimate coffee shop simulation game where you
                  brew success one cup at a time! Immerse yourself in the
                  bustling world of San Francisco and embark on a thrilling
                  entrepreneurial journey to create the most innovative coffee
                  shop in the city.
                </Text>
                <Button
                  as={Link}
                  href='/home'
                  w='fit-content'
                  colorScheme='blue'
                  rightIcon={<IoArrowForward />}
                >
                  Play Now
                </Button>
              </Stack>
              <Image
                src='/static/busy-coffee-shop.jpeg'
                alt='Coffee Shop'
                w='100%'
                borderRadius='lg'
              />
            </SimpleGrid>
            <SimpleGrid gap={16} p={8} columns={2} color='gray.500'>
              <Image
                src='/static/sf-image.png'
                alt='Coffee Shop'
                w='100%'
                borderRadius='lg'
              />
              <Stack spacing={8}>
                <Text>
                  Start from scratch and build your coffee empire from the
                  ground up. Master the art of crafting the perfect cup, attract
                  customers with your unique blends, and watch your profits
                  soar. But that&apos;s just the beginning! As you progress,
                  unlock cutting-edge technology to revolutionize your coffee
                  shop with robots and AI. Streamline your operations, enhance
                  customer experience, and redefine the future of the coffee
                  industry.
                </Text>
                <Button
                  as={Link}
                  href='/home'
                  w='fit-content'
                  colorScheme='blue'
                  rightIcon={<IoArrowForward />}
                >
                  Play Now
                </Button>
              </Stack>
            </SimpleGrid>
            <Divider />
            <Center alignItems='center' w='100%' p={2}>
              <Heading size='lg'>Credits</Heading>
            </Center>
            <Grid
              templateColumns='repeat(12, 1fr)'
              gap={16}
              p={8}
              color='gray.500'
            >
              <Stack spacing={2} as={GridItem} colSpan={4}>
                <Text fontWeight='bold' fontSize='lg' color='blue.500'>
                  The Team
                </Text>
                {CONTRIBUTORS_LIST.map((contributor) => (
                  <Text key={contributor}>{contributor}</Text>
                ))}
              </Stack>
              <Stack as={GridItem} colSpan={8}>
                <Text fontWeight='bold' fontSize='lg' color='blue.500'>
                  Tech Stack
                </Text>
                {TECH_STACK_LIST.map((tech, index) => (
                  <Stack
                    key={index}
                    direction='row'
                    alignItems='center'
                    bg='blue.50'
                    borderRadius='xl'
                    p={4}
                    spacing={4}
                  >
                    <Center w='4rem' h='4rem' bg='white' borderRadius='lg'>
                      <Image src={tech.logoKey} alt={tech.name} w='2rem' />
                    </Center>
                    <Stack spacing={1}>
                      <Stack
                        direction='row'
                        alignItems='center'
                        fontWeight='medium'
                        color='blue.400'
                      >
                        <ChakraLink href={tech.link} isExternal>
                          {tech.name}
                        </ChakraLink>
                        <IoLink />
                      </Stack>
                      <Text key={index}>{tech.description}</Text>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Stack>
          <Box p={8} bg='blue.50' w='100%'>
            <Text color='purple.500' fontWeight='medium'>
              Made with ❤️ at Western University
            </Text>
            <Text color='gray.500' fontSize='sm'>
              For CS4483 W23, ©️ 2023
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
}
