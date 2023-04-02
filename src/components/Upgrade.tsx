import {
  Image,
  Center,
  Flex,
  Spacer,
  Grid,
  GridItem,
  Text,
  Button,
  Stack,
  Wrap,
  chakra,
} from '@chakra-ui/react';

import { HandlePurchaseOfUpgradeProps } from './Game';

import { earningsPerMinute } from '../constants';

export interface UpgradeProps {
  id: number;
  name: string;
  costOfUpgrade: number;
  description: string;
  numberOfUpgrades: number;
  increaseInEarnings: number;
  imageUrl: string;
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
    imageUrl,
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
    <Flex bg='brand.800' borderRadius={16} p={4} gap={4}>
      <Center bg='brand.500' borderRadius={12} padding={6} w='8rem' h='8rem'>
        <Image src={imageUrl} alt={name} />
      </Center>
      <Stack spacing={4}>
        <Stack spacing={0}>
          <Text fontWeight='bold' color='brand.100' fontSize='xl'>
            {name}
          </Text>
          <Text color='brand.500' fontWeight='medium'>
            Owning{' '}
            <chakra.span color='brand.100'>{numberOfUpgrades}</chakra.span>,
            making{' '}
            <chakra.span color='brand.100'>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                (numberOfUpgrades * increaseInEarnings) / earningsPerMinute
              )}
              /min
            </chakra.span>
          </Text>
        </Stack>
        <Stack direction='row' spacing={4}>
          <Button onClick={purchaseHandler} colorScheme='brand'>
            Buy 1
          </Button>
        </Stack>
      </Stack>
      <Spacer />
      <Text color='brand.200' fontSize='xl'>
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(costOfUpgrade)}
      </Text>
    </Flex>
  );
};
