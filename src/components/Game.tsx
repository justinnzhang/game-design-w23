import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Wrap,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { CheckpointDisplay } from './CheckpointDisplay';
import { Cost, CostProps } from './Cost';
import { HeadingCard } from './HeadingCard';
import { Upgrade, UpgradeProps } from './Upgrade';
import { WelcomeModal } from './WelcomeModal';
import { CheckpointModal } from './CheckpointModal';
import { Boost, BoostProps } from './Boost';

import { MOCK_CHECKPOINTS_DATA } from '../constants';

import { childVariants, parentVariants } from '@/animation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export interface HandlePurchaseOfUpgradeProps {
  costOfUpgrade: number;
  increaseInEarnings: number;
  itemName: string;
  itemId: number;
}

export interface HandlePurchaseOfCostProps {
  costOfUpgrade: number;
  decreaseInCosts: number;
  itemId: number;
}

export interface HandlePurchaseOfBoostProps {
  costOfUpgrade: number;
  multiplier: number;
  duration: number;
  itemId: number;
}

export interface SavedDataProps {
  balance: number;
  increment: number;
  expenses: number;
  checkpoint: number;
  upgradesList: UpgradeProps[];
  costsList: CostProps[];
  boostsList: BoostProps[];
  id: number;
  isSavedGame: boolean;
}
export interface Props {
  savedData: SavedDataProps;
}

// When the game stops doing earning-based checkpoints
const EARNING_CHECKPOINT_MAXMIUM = 5;

export const Game = ({ savedData }: Props) => {
  const supabase = useSupabaseClient();

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  const [balance, setBalance] = useState(savedData.balance);
  const [increment, setIncrement] = useState<number>(savedData.increment);
  const [expenses, setExpenses] = useState(savedData.expenses);
  const [tickProgress, setTickProgress] = useState(0);
  const [showEarnedAmount, setShowEarnedAmount] = useState<boolean>(false);

  const [checkpointProgress, setCheckpointProgress] = useState(
    savedData.checkpoint
  );

  const [upgradesList, setUpgradesList] = useState(savedData.upgradesList);
  const [costsList, setCostsList] = useState(savedData.costsList);
  const [boostsList, setBoostsList] = useState(savedData.boostsList);

  const [boostMultiplier, setBoostMultiplier] = useState(1);
  const [boostDuration, setBoostDuration] = useState(0);

  const {
    isOpen: isCheckpointModalOpen,
    onClose: onCheckpointModalClose,
    onOpen: onCheckpointModalOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const [isFasterTick, setIsFasterTick] = useState(false);

  const toast = useToast();

  /**
   * Game tick handler
   */
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setTickProgress((prev) => {
        if (prev < 100) {
          const multiplier = isFasterTick ? 10 : boostMultiplier;

          return prev + 1 * multiplier;
        } else {
          handleTick();
          clearInterval(progressInterval);
          return 0;
        }
      });
    }, 50);

    return () => clearInterval(progressInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  // Show how much money was added to the balance
  useEffect(() => {
    let timeoutId: number | null = null;

    if (showEarnedAmount) {
      timeoutId = window.setTimeout(
        () => {
          setShowEarnedAmount(false);
        },
        isFasterTick ? 100 : 1000
      );
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEarnedAmount]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => handleSave(true), 60000);

    return () => clearInterval(autoSaveInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave(isAutosave = false) {
    setIsSaving(true);

    const dataToSave: DBSaveDataPartial = {
      balance,
      increment,
      expenses,
      checkpoint: checkpointProgress,
      saved_upgrade_counts: fetchUpgradesForDB(),
      saved_costs_data: fetchCostsForDB(),
    };

    const { error } = await supabase
      .from('Save Data')
      .update(dataToSave)
      .eq('id', savedData.id);

    if (error) {
      console.log('Error saving data: ', error);

      toast({
        title: 'Error',
        description: 'There was an error saving your data',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      toast({
        title: `${isAutosave ? 'Autosaved' : 'Saved'}`,
        description: 'Your data has been saved',
        status: 'info',
        duration: isAutosave ? 3000 : 1000,
        isClosable: true,
        position: 'bottom-right',
      });
      setLastSaved(new Date());
    }

    setIsSaving(false);
  }

  function fetchUpgradesForDB() {
    return upgradesList.map((upgrade) => upgrade.numberOfUpgrades);
  }

  function fetchCostsForDB() {
    return costsList.map((cost) => cost.purchased);
  }

  function fetchBoostsForDB() {
    return boostsList.map((boost) => boost.purchased);
  }

  function handleTick() {
    setBalance((prev) => {
      setShowEarnedAmount(true);

      const newBalance = prev + increment * (1 - expenses);

      if (
        checkpointProgress < EARNING_CHECKPOINT_MAXMIUM &&
        newBalance >=
          MOCK_CHECKPOINTS_DATA[checkpointProgress]?.earningThreshold!!
      ) {
        setCheckpointProgress((prevCheckpoint) => prevCheckpoint + 1);
        onCheckpointModalOpen();
      }

      return newBalance;
    });
  }

  const handlePurchaseOfUpgrade = ({
    costOfUpgrade,
    increaseInEarnings,
    itemName,
    itemId,
  }: HandlePurchaseOfUpgradeProps): boolean => {
    if (costOfUpgrade > balance) {
      toast({
        title: 'Insufficient Funds',
        description: "You don't have enough money",
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
      return false;
    }

    const nextBalance = balance - costOfUpgrade;
    setBalance(nextBalance);

    const nextIncrement = increment + increaseInEarnings;
    setIncrement(nextIncrement);

    setUpgradesList((prev) => {
      const newState = [...prev];

      newState[itemId - 1] = {
        ...newState[itemId - 1],
        numberOfUpgrades: newState[itemId - 1]?.numberOfUpgrades + 1,
      };

      return newState;
    });

    toast({
      title: 'Purchased',
      description: `You've purchased 1 ${itemName}`,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    });

    return true;
  };

  const handlePurchaseOfCost = ({
    costOfUpgrade,
    decreaseInCosts,
    itemId,
  }: HandlePurchaseOfCostProps): boolean => {
    if (costOfUpgrade > balance) {
      toast({
        title: 'Insufficient Funds',
        description: "You don't have enough money",
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
      return false;
    }

    const nextBalance = balance - costOfUpgrade;
    setBalance(nextBalance);

    setExpenses((prev) => prev - decreaseInCosts);

    setCostsList((prev) => {
      const newState = [...prev];

      newState[itemId - 1] = {
        ...newState[itemId - 1],
        purchased: true,
      };

      return newState;
    });

    if (itemId >= 6 && checkpointProgress < 7) {
      setCheckpointProgress((prevCheckpoint) => prevCheckpoint + 1);
    }

    return true;
  };

  const handlePurchaseOfBoost = ({
    costOfUpgrade,
    multiplier,
    itemId,
    duration,
  }: HandlePurchaseOfBoostProps): boolean => {
    if (costOfUpgrade > balance) {
      toast({
        title: 'Insufficient Funds',
        description: "You don't have enough money",
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
      return false;
    }

    const nextBalance = balance - costOfUpgrade;
    setBalance(nextBalance);

    setBoostMultiplier(multiplier);
    setBoostDuration(duration);

    setBoostsList((prev) => {
      const newState = [...prev];

      newState[itemId - 1] = {
        ...newState[itemId - 1],
        purchased: true,
      };

      return newState;
    });

    setTimeout(() => {
      setBoostMultiplier(1);
    }, 1000 * duration);

    return true;
  };

  return (
    <>
      <WelcomeModal isSavedGame={savedData.isSavedGame} />
      <CheckpointModal
        isOpen={isCheckpointModalOpen}
        onClose={onCheckpointModalClose}
        checkpoint={MOCK_CHECKPOINTS_DATA[checkpointProgress - 1]}
      />
      <Box bgGradient='linear(to-t, brand.50, brand.100)'>
        <Container maxW='container.xl' position='relative'>
          <Grid
            templateColumns='repeat(12, 1fr)'
            gap={4}
            h='100vh'
            overflow='auto'
          >
            <GridItem colSpan={[12, null, 4]}>
              <Stack
                sx={{
                  position: '-webkit-sticky',
                  // @ts-ignore
                  // eslint-disable-next-line no-dupe-keys
                  /* Safari */ position: 'sticky',
                  top: '4',
                }}
                overflow='auto'
              >
                <HeadingCard
                  tickProgress={tickProgress}
                  balance={balance}
                  increment={increment}
                  expenses={expenses}
                  showEarnedAmount={showEarnedAmount}
                  isFasterTick={isFasterTick}
                  lastSaved={lastSaved}
                  isSaving={isSaving}
                  handleSave={handleSave}
                />
                <CheckpointDisplay
                  checkpoint={
                    checkpointProgress < MOCK_CHECKPOINTS_DATA.length
                      ? MOCK_CHECKPOINTS_DATA[checkpointProgress]
                      : false
                  }
                  currentBalance={balance}
                />
                <Stack p={4} bg='purple.800' borderRadius={8} spacing={4}>
                  <Wrap direction='row' alignContent='center'>
                    <Text fontSize='sm' fontWeight='bold' color='brand.200'>
                      Testing Tools
                    </Text>

                    <Badge h='fit-content' colorScheme='brand'>
                      Testing
                    </Badge>
                  </Wrap>
                  <Tooltip
                    hasArrow
                    label='Overrides any active boosts you have set'
                  >
                    <Button
                      onClick={() => {
                        setIsFasterTick((prev) => !prev);
                      }}
                    >
                      {isFasterTick
                        ? '🐌 Regular Earning Speed'
                        : '⚡️ 10x Earning Speed'}
                    </Button>
                  </Tooltip>
                  <Button
                    onClick={() => {
                      setBalance((prev) => prev + 1000);
                    }}
                  >
                    Add $1,000
                  </Button>
                  <Button
                    onClick={() => {
                      setBalance((prev) => prev + 1000000);
                    }}
                  >
                    Add $1,000,000
                  </Button>
                  <Button
                    onClick={() => {
                      setBalance((prev) => prev + 10000000);
                    }}
                  >
                    Add $10,000,000
                  </Button>
                </Stack>
              </Stack>
            </GridItem>
            <GridItem colSpan={[12, null, 8]} py={4} h='100%'>
              {boostMultiplier > 1 && (
                <Alert
                  my={2}
                  borderRadius={8}
                  backgroundColor='brand.600'
                  color='white'
                >
                  <AlertIcon color='white' />
                  Earnings are boosted by {boostMultiplier}x for {boostDuration}{' '}
                  seconds
                </Alert>
              )}
              <Tabs isLazy variant='soft-rounded' colorScheme='yellow'>
                <TabList>
                  <Tab>Upgrades</Tab>
                  <Tab>Costs</Tab>
                  <Tab>Boosts</Tab>
                </TabList>
                {/* Upgrades */}
                <TabPanels>
                  <TabPanel>
                    <motion.div
                      variants={parentVariants}
                      initial='initial'
                      animate='animate'
                    >
                      <Stack>
                        <Heading>Upgrades</Heading>
                        <Text color='gray.800'>
                          Increase the range of coffees you can sell to earn
                          more!
                        </Text>
                        {upgradesList.map((upgrade, index) => (
                          <motion.div
                            key={`upgrades-${upgrade.id}`}
                            variants={childVariants}
                          >
                            <Upgrade
                              item={upgrade}
                              handlePurchase={handlePurchaseOfUpgrade}
                            />
                          </motion.div>
                        ))}
                        <motion.div>
                          <Box
                            borderRadius={8}
                            bg='brand.800'
                            color='white'
                            p={4}
                          >
                            <Text fontWeight='medium'>?????????</Text>
                          </Box>
                        </motion.div>
                      </Stack>
                    </motion.div>
                  </TabPanel>
                  {/* Costs */}
                  <TabPanel>
                    <motion.div
                      variants={parentVariants}
                      initial='initial'
                      animate='animate'
                    >
                      <Stack>
                        <Heading>Costs</Heading>
                        <Text color='gray.800'>
                          Reduce your costs to help you make more profit
                        </Text>
                        {costsList.map((cost, index) => {
                          if (index === 6 && checkpointProgress < 6)
                            return null;
                          return (
                            <motion.div
                              key={`costs-${cost.id}`}
                              variants={childVariants}
                            >
                              <Cost
                                item={cost}
                                handlePurchase={handlePurchaseOfCost}
                              />
                            </motion.div>
                          );
                        })}
                      </Stack>
                    </motion.div>
                  </TabPanel>
                  {/* Boosts */}
                  <TabPanel>
                    <motion.div
                      variants={parentVariants}
                      initial='initial'
                      animate='animate'
                    >
                      <Stack>
                        <Heading>Boosts</Heading>
                        <Text color='gray.800'>
                          Create hype, manufacture your own luck and gain
                          temproary huge sales multipliers. <br /> Note: these
                          are single use.{' '}
                        </Text>
                        {boostsList.map((boost, index) => {
                          if (index === 6 && checkpointProgress < 6)
                            return null;
                          return (
                            <motion.div
                              key={`boosts-${boost.id}`}
                              variants={childVariants}
                            >
                              <Boost
                                item={boost}
                                handlePurchase={handlePurchaseOfBoost}
                                forceDisabled={boostMultiplier > 1}
                              />
                            </motion.div>
                          );
                        })}
                      </Stack>
                    </motion.div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
