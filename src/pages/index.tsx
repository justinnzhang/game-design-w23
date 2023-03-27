import Head from 'next/head';
import { useBreakpointValue, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ScreenTooSmall, AuthWrapper } from '../components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function HomePage() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaveData, setIsSaveData] = useState(false);

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
    xs: true,
  });

  useEffect(() => {
    handleUserDataFetch();
  }, []);

  // Fetches the new user's data from the database
  async function handleUserDataFetch() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
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

      setIsSaveData(true);
    }

    setIsLoading(false);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  if (isMobile) {
    return <ScreenTooSmall />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
          {isSaveData ? 'Continue' : 'Start New Game'}
        </Button>
        <Button onClick={signOut}>Sign Out</Button>
      </AuthWrapper>
    </>
  );
}
