import Head from 'next/head';
import { useBreakpointValue, Button } from '@chakra-ui/react';
import Link from 'next/link';

import { ScreenTooSmall, AuthWrapper } from '../components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function HomePage() {
  const supabase = useSupabaseClient();

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
    xs: true,
  });

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  if (isMobile) {
    return <ScreenTooSmall />;
  }

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
        <p>Welcome to Coffee.io</p>
        <Button as={Link} href='/game'>
          Start Playing
        </Button>
        <Button onClick={signOut}>Sign Out</Button>
      </AuthWrapper>
    </>
  );
}
