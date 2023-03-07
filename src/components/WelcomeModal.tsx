import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  useDisclosure,
  Image,
} from '@chakra-ui/react';

export const WelcomeModal = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to Coffee.io</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack color='gray.600' spacing={4}>
            <Image src='/static/sf-image.png' alt='Picture of San Fransico' />
            <Text>
              Set in the sunny streets of San Francisco, you are the founder of
              Coffee.io - the city’s newest coffee shop. As a former software
              engineer-turned-barista, you set your goals high and aim to one
              day become larger than Starbucks.
            </Text>
            <Text>
              You begin your journey with a single coffee maker and a big vision
              for the future.
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={onClose}>
            Get started!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
