import { useState } from 'react';
import {
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
  chakra,
  Tooltip,
} from '@chakra-ui/react';

import { HandlePurchaseOfBoostProps } from './Game';

export interface BoostProps {
  id: number;
  name: string;
  description: string;
  cost: number;
  multiplier: number;
  duration: number;
  purchased: boolean;
}

interface Props {
  item: BoostProps;
  forceDisabled?: boolean;
  handlePurchase: ({
    costOfUpgrade,
    multiplier,
    itemId,
  }: HandlePurchaseOfBoostProps) => boolean;
}

export const Boost = ({ item, forceDisabled, handlePurchase }: Props) => {
  const { id, name, description, cost, purchased, multiplier, duration } = item;

  const [isPurchased, setIsPurchased] = useState(purchased);

  function handlePurchaseAction() {
    const didPurchase = handlePurchase({
      costOfUpgrade: cost,
      multiplier: multiplier,
      itemId: id,
      duration,
    });

    if (!didPurchase) {
      return;
    }

    setIsPurchased(true);
  }

  return (
    <>
      <Flex
        bg={isPurchased ? 'brand.700' : 'brand.800'}
        borderRadius={16}
        p={4}
        gap={4}
      >
        <Stack spacing={4}>
          <Stack spacing={0}>
            <Text
              fontWeight='bold'
              color={isPurchased ? 'brand.200' : 'brand.100'}
              fontSize='2xl'
            >
              {name}
            </Text>
            <Text color='brand.200' fontWeight='medium'>
              {description}
            </Text>
            <Text color='brand.500' fontWeight='medium' fontSize='md'>
              Multiplier:{' '}
              <chakra.span color='brand.100'>{multiplier}x</chakra.span> |
              Duration: <chakra.span color='brand.100'>{duration}s</chakra.span>
            </Text>
          </Stack>
          <Stack direction='row' spacing={4}>
            <Tooltip
              hasArrow
              label='Cannot purchase a boost while another boost is running'
              isDisabled={!forceDisabled}
            >
              <Button
                onClick={handlePurchaseAction}
                colorScheme='brand'
                isDisabled={isPurchased || forceDisabled}
              >
                {isPurchased ? 'Purchased' : 'Purchase'}
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Spacer />
        <Text color={isPurchased ? 'brand.400' : 'brand.200'} fontSize='xl'>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(cost)}
        </Text>
      </Flex>
    </>
  );
};
