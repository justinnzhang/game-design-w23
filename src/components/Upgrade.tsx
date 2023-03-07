import { useState } from 'react';
import { Grid, GridItem, Text, Button, Stack, Wrap } from '@chakra-ui/react';

import { HandlePurchaseOfUpgradeProps } from './Game';

import { earningsPerMinute } from '../constants';

export interface UpgradeProps {
  id: number;
  name: string;
  costOfUpgrade: number;
  description: string;
  numberOfUpgrades: number;
  increaseInEarnings: number;
}

interface Props {
  item: UpgradeProps;
  handlePurchase: ({
    costOfUpgrade,
    increaseInEarnings,
    itemName,
    itemId,
  }: HandlePurchaseOfUpgradeProps) => boolean;
}

export const Upgrade = ({ item, handlePurchase }: Props) => {
  const {
    id,
    name,
    costOfUpgrade,
    description,
    numberOfUpgrades,
    increaseInEarnings,
  } = item;

  function purchaseHandler() {
    const didPurchase = handlePurchase({
      costOfUpgrade,
      increaseInEarnings,
      itemName: name,
      itemId: id,
    });
    if (!didPurchase) {
      return;
    }
  }

  return (
    <Grid
      templateColumns='repeat(12, 1fr)'
      gap={4}
      p={4}
      bg='blue.800'
      borderRadius={8}
      overflow='hidden'
    >
      <GridItem colSpan={[4, 4, 3]}>
        <Stack spacing={3}>
          <Stack spacing={0}>
            <Text fontWeight='bold' color='blue.50'>
              {name}
            </Text>
            <Text color='blue.200'>
              Cost:{' '}
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(costOfUpgrade)}
            </Text>
          </Stack>
          <Button onClick={purchaseHandler} size='sm' w='fit-content'>
            Buy 1
          </Button>
        </Stack>
      </GridItem>
      <GridItem colSpan={[8, 8, 9]}>
        <Wrap>
          <Text color='blue.100' fontSize='sm' fontWeight='bold'>
            Making{' '}
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(
              (numberOfUpgrades * increaseInEarnings) / earningsPerMinute
            )}
            /min
          </Text>
          <Text color='blue.100' fontSize='sm'>
            | {numberOfUpgrades} owned
          </Text>
        </Wrap>
        <Text color='blue.50'>{description}</Text>
      </GridItem>
    </Grid>
  );
};
