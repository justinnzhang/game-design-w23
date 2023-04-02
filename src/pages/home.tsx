import Head from 'next/head';
import {
  useBreakpointValue,
  Button,
  Box,
  Center,
  Skeleton,
  Container,
  Stack,
  Text,
  Heading,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

import { ScreenTooSmall, AuthWrapper } from '../components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function HomePage() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaveData, setIsSaveData] = useState(false);

  const [balance, setBalance] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
    xs: true,
  });

  useEffect(() => {
    handleUserDataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetches the new user's data from the database
  async function handleUserDataFetch() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('[DEBUG] No user found,');
      setIsLoading(false);

      return;
    }

    const { data: saveData, error } = await supabase
      .from('Save Data')
      .select()
      .match({ user_id: user.id });

    if (error || !saveData.length) {
      console.error('User not found, creating new user', error);

      const { data, error: insertError } = await supabase
        .from('Save Data')
        .insert({
          user_id: user.id,
        });

      console.log('New user created', data, insertError);
    } else {
      console.log('Save data found', saveData);
      setBalance(saveData[0].balance);

      if (saveData[0].saved_upgrade_counts) {
        setIsSaveData(true);
      }
    }

    setIsLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function deleteSavedData() {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('[DEBUG] No user found,');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('Save Data')
      .delete()
      .match({ user_id: user.id });

    if (error) {
      console.error('Error deleting save data', error);
    }

    setIsSaveData(false);
    setIsLoading(false);
    onClose();

    handleUserDataFetch();

    console.log('Save data deleted');
  }

  if (isMobile) {
    return <ScreenTooSmall />;
  }

  if (isLoading) {
    return (
      <Box
        w='100vw'
        h='100vh'
        bgGradient='linear(to-br, yellow.50 0%, purple.100 25%, brand.100 50%)'
      >
        <Container maxW='container.sm' h='$100vh'>
          <Center h='100%'>
            <Stack
              w='100%'
              bg='white'
              p={8}
              borderRadius='xl'
              borderColor='gray.200'
              borderWidth='1px'
              spacing={8}
            >
              <Stack>
                <Skeleton height='2rem' maxW='20rem' />
                <Skeleton height='1rem' maxW='30rem' />
              </Stack>
              <Stack>
                <Skeleton height='1.5rem' />
                <Skeleton height='1.5rem' />
                <Skeleton height='1.5rem' />
                <Skeleton height='1.5rem' />
                <Skeleton height='1.5rem' />
                <Skeleton height='1.5rem' />
              </Stack>
              <Stack alignItems='center' w='100%'>
                <Skeleton height='2rem' w='50%' />
                <Skeleton height='2rem' w='50%' />
              </Stack>
            </Stack>
          </Center>
        </Container>
      </Box>
    );
  }

  const savedProgressMarkup = isSaveData ? (
    <Stack p={4} border='1px solid' borderColor='gray.100' borderRadius='lg'>
      <Text fontWeight='medium' fontSize='sm' color='gray.400'>
        Your Balance
      </Text>
      <Text noOfLines={1} fontSize='lg'>
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(balance)}
      </Text>
    </Stack>
  ) : null;

  const deleteAndRestartMarkup = isSaveData ? (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Saved Data
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteSavedData} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Button onClick={onOpen} variant='ghost' colorScheme='red'>
        Restart Progress
      </Button>
    </>
  ) : null;

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
      <AuthWrapper>
        <Box
          w='100vw'
          h='100vh'
          bgGradient='linear(to-br, yellow.50 0%, purple.100 25%, brand.100 50%)'
        >
          <Container maxW='container.sm' h='$100vh'>
            <Center h='100%'>
              <Stack
                w='100%'
                bg='white'
                p={8}
                borderRadius='xl'
                borderColor='gray.200'
                borderWidth='1px'
                spacing={8}
              >
                <Heading size='xl' color='brand.500'>
                  Coffee.io
                </Heading>
                {savedProgressMarkup}
                <Stack w='100%'>
                  <Button as={Link} href='/game' colorScheme='green'>
                    {isSaveData ? 'Continue Saved Game' : 'Start New Game'}
                  </Button>
                  <Button onClick={signOut} variant='ghost'>
                    Sign Out
                  </Button>
                </Stack>
                {deleteAndRestartMarkup}
              </Stack>
            </Center>
          </Container>
        </Box>
      </AuthWrapper>
    </>
  );
}
