import { Box, Center, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: Props) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  if (!user) {
    return (
      <Box
        w='100vw'
        h='100vh'
        bgGradient='linear(to-br, yellow.50 0%, purple.100 25%, blue.100 50%)'
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
              <Heading size='xl' color='blue.500'>
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
                        brand: '#2B6CB0',
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
