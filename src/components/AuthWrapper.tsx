import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Alert,
  AlertIcon,
  useToken,
} from '@chakra-ui/react';
import Link from 'next/link';
import { User, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { IoArrowBack } from 'react-icons/io5';

interface Props {
  children: React.ReactNode;
  user: User | null;
}

export const AuthWrapper = ({ children, user }: Props) => {
  const supabase = useSupabaseClient();

  const [brown100, brown200, brown300, brown400, brown500, brown600] = useToken(
    'colors',
    [
      'brand.100',
      'brand.200',
      'brand.300',
      'brand.400',
      'brand.500',
      'brand.600',
    ]
  );

  const customizeBrandColors = {
    brand: brown500,
    brandAccent: brown300,
    brandButtonText: 'white',
    defaultButtonBackground: 'white',
    defaultButtonBackgroundHover: '#eaeaea',
    defaultButtonBorder: 'lightgray',
    defaultButtonText: 'gray',
    dividerBackground: '#eaeaea',
    inputBackground: 'transparent',
    inputBorder: 'lightgray',
    inputBorderHover: 'gray',
    inputBorderFocus: 'gray',
    inputText: 'black',
    inputLabelText: 'gray',
    inputPlaceholder: 'darkgray',
    messageText: 'gray',
    messageTextDanger: 'red',
    anchorTextColor: 'gray',
    anchorTextHoverColor: 'darkgray',
  };

  if (!user) {
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
            >
              <Button
                as={Link}
                href='/'
                variant='ghost'
                w='fit-content'
                leftIcon={<IoArrowBack />}
              >
                Back
              </Button>
              <Alert colorScheme='brand' color='brand.700'>
                <AlertIcon />
                Please use a personal Gmail account to sign up. Your UWO email
                may block the verification email.
              </Alert>
              <Heading size='xl' color='brand.500' pt={4}>
                Coffee.io
              </Heading>
              <Text color='gray.500'>
                Where coffee and technology meet - the newest business
                simulation game
              </Text>

              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        ...customizeBrandColors,
                      },
                    },
                  },
                }}
                providers={[]}
              />
            </Stack>
          </Center>
        </Container>
      </Box>
    );
  }

  return <>{children}</>;
};
