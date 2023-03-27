import Head from 'next/head';
import { useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ScreenTooSmall, Game, AuthWrapper } from '../components';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { SavedDataProps } from '../components/Game';

import { MOCK_UPGRADE_LIST_DATA, MOCK_COST_DATA } from '../constants';

export default function GamePage() {
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(true);
  const [savedData, setSavedData] = useState<SavedDataProps>();

  useEffect(() => {
    fetchSaveData();
  }, []);

  async function fetchSaveData() {
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

    if (error) {
      console.log("[DEBUG] oops, couldn't find save data", error);

      setIsLoading(false);
      return;
    }

    // Adding types the lazy way LMAO
    const typedSaveData = saveData[0] as DBSaveData;

    console.log('[DEBUG] Save data found', saveData);

    const gameState: SavedDataProps = {
      balance: typedSaveData.balance,
      increment: typedSaveData.increment || 1,
      checkpoint: typedSaveData.checkpoint || 0,
      expenses: typedSaveData.expenses || 0,
      upgradesList: formatUpgradeData(typedSaveData.saved_upgrade_counts),
      costsList: formatCostsData(typedSaveData.saved_costs_data),
      id: typedSaveData.id,
      isSavedGame: !!typedSaveData.saved_upgrade_counts,
    };

    console.log('[DEBUG] Formatted save data', gameState);
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
    return <div>Loading...</div>;
  }

  if (!savedData) {
    return <div>Initializing Game</div>;
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
