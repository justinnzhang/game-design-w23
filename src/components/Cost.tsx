import { useState } from 'react';
import { Text, Stack, Button, Flex, Spacer } from '@chakra-ui/react';

import { HandlePurchaseOfCostProps } from './Game';

export interface CostProps {
  id: number;
  name: string;
  description: string;
  costOfUpgrade: number;
  purchased: boolean;
}

interface Props {
  item: CostProps;
  handlePurchase: ({
    costOfUpgrade,
    decreaseInCosts,
    itemId,
  }: HandlePurchaseOfCostProps) => boolean;
}

export const Cost = ({ item, handlePurchase }: Props) => {
  const { id, name, description, costOfUpgrade, purchased } = item;

  const [isPurchased, setIsPurchased] = useState(purchased);

  function handlePurchaseAction() {
    const didPurchase = handlePurchase({
      costOfUpgrade,
      decreaseInCosts: 0.1,
      itemId: id,
    });
    if (!didPurchase) {
      return;
    }

    setIsPurchased(true);
  }

  return (
    <Flex p={4} bg={isPurchased ? 'blue.500' : 'blue.800'} borderRadius={8}>
      <Stack spacing={1}>
        <Text color='white'>{name}</Text>
        <Text color='blue.200'>
          Cost:{' '}
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(costOfUpgrade)}
        </Text>
      </Stack>
      <Spacer />
      <Button
        w='fit-content'
        onClick={handlePurchaseAction}
        isDisabled={isPurchased}
      >
        {isPurchased ? 'Purchased' : 'Purchase'}
      </Button>
    </Flex>
  );
};
