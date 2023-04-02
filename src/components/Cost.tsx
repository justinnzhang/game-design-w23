import { useState } from 'react';
import {
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

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

const STORY_TRIGGERS: { [key: number]: any } = {
  6: {
    title: 'The First Steps',
    body: (
      <Stack color='gray.500'>
        <Text>
          The lights flicker as you turn on the robot. &quot;Finally&quot;, you
          say to yourself.
        </Text>
        <Text>
          As you look around your coffee shop, you see the potential to
          introduce more technology. Your eyes light up as one single thought
          enters your mind...
        </Text>
        <Text color='gray.600' fontSize='xl'>
          &quot;Artificial Intelligence&quot;
        </Text>
      </Stack>
    ),
  },
  7: {
    title: 'Becoming Artificially Intelligent',
    body: (
      <Stack color='gray.500'>
        <Text>
          You step back from your best creation, a version of yourself. You look
          into the glassy eyes as you flick the switch at the back of the robot.
        </Text>
        <Text>
          It whirrs to life, and you watch as it begins to move. It walks
          towards you, and you can see the gears turning in its head. While
          looking around, it begins to note the surroundings.
        </Text>
        <Text>It looks at you and utters one single word.</Text>
        <Text color='gray.600' fontSize='xl'>
          &quot;Coffee&quot;
        </Text>
      </Stack>
    ),
  },
};

export const Cost = ({ item, handlePurchase }: Props) => {
  const { id, name, description, costOfUpgrade, purchased } = item;

  const { isOpen, onOpen, onClose } = useDisclosure();

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

    if (STORY_TRIGGERS[id]) {
      onOpen();
    }
    setIsPurchased(true);
  }

  const storyModalMarkup = (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{STORY_TRIGGERS[id]?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{STORY_TRIGGERS[id]?.body}</ModalBody>
        <ModalFooter>
          <Button colorScheme='green' onClick={onClose}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {storyModalMarkup}
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
          </Stack>
          <Stack direction='row' spacing={4}>
            <Button
              onClick={handlePurchaseAction}
              colorScheme='brand'
              isDisabled={isPurchased}
            >
              {isPurchased ? 'Purchased' : 'Purchase'}
            </Button>
          </Stack>
        </Stack>
        <Spacer />
        <Text color={isPurchased ? 'brand.400' : 'brand.200'} fontSize='xl'>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(costOfUpgrade)}
        </Text>
      </Flex>
    </>
  );
};
