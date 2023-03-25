import Head from 'next/head';
import { useBreakpointValue } from '@chakra-ui/react';

import { ScreenTooSmall, Game, AuthWrapper } from '../components';

export default function GamePage() {
  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
    xs: true,
  });
  if (isMobile) {
    return <ScreenTooSmall />;
  }

  return (
    <>
      <Head>
        <title>Coffee.io Game</title>
        <meta
          name='description'
          content='Prototype by Justin Zhang for Game Design, UWO W23'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AuthWrapper>
        <Game />
      </AuthWrapper>
    </>
  );
}
