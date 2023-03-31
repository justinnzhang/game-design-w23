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
import { CheckpointProps } from './CheckpointDisplay';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  checkpoint: CheckpointProps;
}

export const CheckpointModal = ({ isOpen, onClose, checkpoint }: Props) => {
  if (checkpoint == null) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          🎉 Congratulations on making{' '}
          {checkpoint.description.split(' ').slice(1).join(' ')} 🎉
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack color="gray.600" spacing={4}>
            <Image
              src="/static/money-coffee.png"
              alt="Picture of a coffee cup holding cash money"
            />
            <Text>{checkpoint.completionText}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Continue brewing
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
