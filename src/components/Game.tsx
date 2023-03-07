import { useState, useEffect } from 'react';
import {
  Container,
  Text,
  Heading,
  Box,
  Stack,
  Grid,
  GridItem,
  Badge,
  Progress,
  Wrap,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { Upgrade } from './Upgrade';
import { CheckpointDisplay } from './CheckpointDisplay';
import { WelcomeModal } from './WelcomeModal';
import { Cost } from './Cost';

import {
  MOCK_UPGRADE_LIST_DATA,
  MOCK_CHECKPOINTS_DATA,
  MOCK_COST_DATA,
} from '../constants';

import { CARD_STYLE_PROPS } from '@/constants/styling';
import { parentVariants, childVariants } from '@/animation';

const DEFAULT_EXPENSES_PERCENTAGE = 0.7;

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

export const Game = () => {
  const [balance, setBalance] = useState(1);
  const [increment, setIncrement] = useState<number>(1);
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES_PERCENTAGE);
  const [tickProgress, setTickProgress] = useState(0);
  const [showEarnedAmount, setShowEarnedAmount] = useState<boolean>(false);

  const [checkpointProgress, setCheckpointProgress] = useState(0);

  const [upgradesList, setUpgradesList] = useState(MOCK_UPGRADE_LIST_DATA);
  const [costsList, setCostsList] = useState(MOCK_COST_DATA);

  const [isFasterTick, setIsFasterTick] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setTickProgress((prev) => {
        if (prev < 100) {
          const multiplier = isFasterTick ? 10 : 1;

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

  function handleTick() {
    setBalance((prev) => {
      setShowEarnedAmount(true);

      const newBalance = prev + increment * (1 - expenses);

      if (
        checkpointProgress < 5 &&
        newBalance >= MOCK_CHECKPOINTS_DATA[checkpointProgress].earningThreshold
      ) {
        setCheckpointProgress((prevCheckpoint) => prevCheckpoint + 1);
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

    return true;
  };

  const motionProps = {
    initial: { opacity: 0, y: 0 },
    animate: {
      opacity: 1,
      y: -20,
      transition: { duration: isFasterTick ? 0.1 : 0.9, ease: 'easeOut' },
    },
  };

  const balanceIncreaseMarkup = showEarnedAmount ? (
    <motion.div
      style={{
        position: 'absolute',
        right: 10,
        top: 20,
        overflow: 'visible',
        height: '0px',
      }}
      variants={motionProps}
      animate='animate'
      initial='initial'
    >
      <Text fontSize='xl' fontWeight='medium' p={0} m={0} color='green.100'>
        +{' '}
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(increment * (1 - expenses))}
      </Text>
    </motion.div>
  ) : null;

  return (
    <>
      <WelcomeModal />
      <Box bgGradient='linear(to-t, blue.50, blue.100)'>
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
                <Stack {...CARD_STYLE_PROPS}>
                  <Wrap direction='row' alignContent='center'>
                    <Heading color='blue.200'>Coffee.io</Heading>
                    <Badge h='fit-content' colorScheme='blue'>
                      Prototype
                    </Badge>
                  </Wrap>
                </Stack>
                <Stack {...CARD_STYLE_PROPS} position='relative'>
                  <Text fontSize='sm' fontWeight='bold' color='blue.200'>
                    Earnings
                  </Text>

                  {balanceIncreaseMarkup}
                  <Stack spacing={1}>
                    <Progress
                      value={tickProgress}
                      size='xs'
                      w='100%'
                      colorScheme='blue'
                    />
                    <Stack direction='row' color='gray.200' fontSize='lg'>
                      <Text fontWeight='bold'>Balance</Text>
                      <Text>
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(balance)}
                      </Text>
                    </Stack>
                    <Stack spacing={0}>
                      <Text color='gray.500'>
                        Gross Earnings: $
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(increment)}
                        /min
                      </Text>
                      <Text color='gray.500'>
                        Costs:{' '}
                        {Intl.NumberFormat('en-US', {
                          style: 'percent',
                          maximumFractionDigits: 2,
                        }).format(expenses)}
                      </Text>
                      <Text color='gray.100'>
                        Net Earnings:{' '}
                        {Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(increment * (1 - expenses))}
                        /min
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
                <CheckpointDisplay
                  checkpoint={
                    checkpointProgress < 4
                      ? MOCK_CHECKPOINTS_DATA[checkpointProgress]
                      : false
                  }
                  currentBalance={balance}
                />
                <Stack
                  px={8}
                  py={6}
                  bg='purple.800'
                  borderRadius={8}
                  spacing={4}
                >
                  <Wrap direction='row' alignContent='center'>
                    <Text fontSize='sm' fontWeight='bold' color='blue.200'>
                      Testing Tools
                    </Text>

                    <Badge h='fit-content' colorScheme='blue'>
                      Testing
                    </Badge>
                  </Wrap>
                  <Button
                    onClick={() => {
                      setIsFasterTick((prev) => !prev);
                    }}
                  >
                    {isFasterTick
                      ? 'Regular Earning Speed'
                      : '10x Earning Speed'}
                  </Button>
                </Stack>
              </Stack>
            </GridItem>
            <GridItem colSpan={[12, null, 8]} py={4} h='100%'>
              <Tabs isLazy variant='soft-rounded' colorScheme='green'>
                <TabList>
                  <Tab>Upgrades</Tab>
                  <Tab>Costs</Tab>
                </TabList>
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
                          You need to spend money to make money!
                        </Text>
                        {upgradesList.map((upgrade) => (
                          <motion.div key={upgrade.id} variants={childVariants}>
                            <Upgrade
                              item={upgrade}
                              handlePurchase={handlePurchaseOfUpgrade}
                            />
                          </motion.div>
                        ))}
                        <motion.div>
                          <Box
                            borderRadius={8}
                            bg='blue.800'
                            color='white'
                            p={4}
                          >
                            <Text fontWeight='medium'>?????????</Text>
                          </Box>
                        </motion.div>
                      </Stack>
                    </motion.div>
                  </TabPanel>
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
                        {costsList.map((cost) => (
                          <motion.div key={cost.id} variants={childVariants}>
                            <Cost
                              item={cost}
                              handlePurchase={handlePurchaseOfCost}
                            />
                          </motion.div>
                        ))}
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
