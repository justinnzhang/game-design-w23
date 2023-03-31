import Head from 'next/head';
import {
  useBreakpointValue,
  Box,
  Center,
  Spinner,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ScreenTooSmall, Game, AuthWrapper } from '../components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { SavedDataProps } from '../components/Game';

import { MOCK_UPGRADE_LIST_DATA, MOCK_COST_DATA } from '../constants';
import Link from 'next/link';

export default function GamePage() {
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(true);
  const [savedData, setSavedData] = useState<SavedDataProps>();

  useEffect(() => {
    fetchSaveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSaveData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data: saveData, error } = await supabase
      .from('Save Data')
      .select()
      .match({ user_id: user.id });

    if (error) {
      setIsLoading(false);
      return;
    }

    // Adding types the lazy way LMAO
    const typedSaveData = saveData[0] as DBSaveData;

    const gameState: SavedDataProps = {
      balance: typedSaveData?.balance || 0,
      increment: typedSaveData?.increment || 1,
      checkpoint: typedSaveData?.checkpoint || 0,
      expenses: typedSaveData?.expenses || 0,
      upgradesList: formatUpgradeData(typedSaveData?.saved_upgrade_counts),
      costsList: formatCostsData(typedSaveData?.saved_costs_data),
      id: typedSaveData?.id,
      isSavedGame: !!typedSaveData?.saved_upgrade_counts,
    };

    setSavedData(gameState);
    setIsLoading(false);
  }

  function formatUpgradeData(savedUpgradeCounts: number[] | null) {
    if (!savedUpgradeCounts) return MOCK_UPGRADE_LIST_DATA;

    const formattedUpgradeData = [...MOCK_UPGRADE_LIST_DATA];

    formattedUpgradeData.forEach((upgrade, index) => {
      return (upgrade.numberOfUpgrades = savedUpgradeCounts![index]);
    });

    return formattedUpgradeData;
  }

  function formatCostsData(savedCostsData: boolean[] | null) {
    if (!savedCostsData) return MOCK_COST_DATA;

    const formattedCostsData = [...MOCK_COST_DATA];

    formattedCostsData.forEach((cost, index) => {
      return (cost.purchased = savedCostsData![index]);
    });

    return formattedCostsData;
  }

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
    xs: true,
  });

  if (isMobile) {
    return <ScreenTooSmall />;
  }

  if (isLoading) {
    return (
      <Box bgGradient='linear(to-t, blue.50, blue.100)' h='$100vh' w='100vw'>
        <Center h='100%'>
          <Stack alignItems='center' spacing={4}>
            <Text fontWeight='bold' fontSize='xl'>
              Loading Coffee.io
            </Text>
            <Spinner />
          </Stack>
        </Center>
      </Box>
    );
  }

  if (!savedData) {
    return (
      <Box bgGradient='linear(to-t, blue.50, blue.100)' h='$100vh' w='100vw'>
        <Center h='100%'>
          <Stack alignItems='center' spacing={4}>
            <Text fontWeight='bold' fontSize='xl'>
              Inializing Game
            </Text>
            <Spinner />
            <Button as={Link} href='/'>
              Back Home
            </Button>
          </Stack>
        </Center>
      </Box>
    );
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
        <Game savedData={savedData} />
      </AuthWrapper>
    </>
  );
}
