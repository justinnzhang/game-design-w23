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
  IconButton,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';

import { IoArrowForward, IoLink, IoLogoGithub } from 'react-icons/io5';

import { CONTRIBUTORS_LIST, TECH_STACK_LIST } from '../constants';

const GITHUB_REPO_URL = 'https://github.com/justinnzhang/game-design-w23';

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
        w='100%'
        minH='100vh'
        h='fit-content'
        bgGradient='linear(to-br, blue.200 0%, purple.100 25%, brand.50 50%, brand.100 100%)'
        overflow='hidden'
        m={0}
        p={0}
      >
        <Container
          maxW='container.lg'
          p={0}
          bg='white'
          position='relative'
          boxShadow='lg'
        >
          <Box
            p={4}
            bg='brand.100'
            as={Flex}
            alignItems='center'
            id='heading'
            position='-webkit-sticky'
          >
            <Text fontWeight='medium' fontSize='lg' color='brand.800'>
              Coffee.io
            </Text>
            <Spacer />
            <Stack spacing={4} direction='row'>
              <IconButton
                size='md'
                icon={<IoLogoGithub />}
                variant='ghost'
                href={GITHUB_REPO_URL}
                colorScheme='brand'
                as={ChakraLink}
                aria-label='GitHub Repo'
              />
              <Button as={Link} href='/home' colorScheme='brand' size='md'>
                Play Now
              </Button>
            </Stack>
          </Box>
          <Stack>
            <Flex p={8} alignItems='center'>
              <Heading
                size='2xl'
                bgGradient='linear(to-br, brand.100, brand.400, brand.500)'
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
                  Coffee.io - the ultimate coffee shop simulation game where you
                  brew success one cup at a time! Immerse yourself in the
                  bustling world of San Francisco and embark on a thrilling
                  entrepreneurial journey to create the most innovative coffee
                  shop in the city.
                </Text>
                <Button
                  as={Link}
                  href='/home'
                  w='fit-content'
                  colorScheme='brand'
                  rightIcon={<IoArrowForward />}
                  size='sm'
                  variant='ghost'
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
                  colorScheme='brand'
                  rightIcon={<IoArrowForward />}
                  size='sm'
                  variant='ghost'
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
                <Text fontWeight='bold' fontSize='lg' color='brand.500'>
                  The Team
                </Text>
                {CONTRIBUTORS_LIST.map((contributor) => (
                  <Text key={contributor}>{contributor}</Text>
                ))}
              </Stack>
              <Stack as={GridItem} colSpan={8}>
                <Text fontWeight='bold' fontSize='lg' color='brand.500'>
                  Tech Stack
                </Text>
                {TECH_STACK_LIST.map((tech, index) => (
                  <Stack
                    key={index}
                    direction='row'
                    alignItems='center'
                    bg='brand.50'
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
                        color='brand.400'
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
          <Box p={8} bg='brand.50' w='100%'>
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
