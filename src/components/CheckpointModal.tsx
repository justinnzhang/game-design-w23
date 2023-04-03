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
import { useReward } from 'react-rewards';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  checkpoint: CheckpointProps | null;
}

export const CheckpointModal = ({ isOpen, onClose, checkpoint }: Props) => {
  const { reward, isAnimating } = useReward('confettiReward', 'confetti', {
    lifetime: 500,
    elementCount: 200,
    spread: 75,
    startVelocity: 50,
  });
  const { reward: balloonsReward, isAnimating: isBalloonsAnimating } =
    useReward('balloonsReward', 'balloons', {
      lifetime: 500,
      elementCount: 50,
      spread: 200,
      startVelocity: 15,
    });
  const { reward: emojiReward, isAnimating: isEmojiAnimating } = useReward(
    'emojiReward',
    'emoji',
    {
      lifetime: 500,
      elementCount: 50,
      spread: 200,
      startVelocity: 50,
      emoji: ['☕️', '💰', '🤑', '💸'],
    }
  );

  // call reward when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(function () {
        console.log('rewarding');
        reward();
        balloonsReward();
        emojiReward();
      }, 10);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          🎉 Congratulations on making{' '}
          {checkpoint?.description.split(' ').slice(1).join(' ')} 🎉
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack color='gray.600' spacing={4}>
            <Image
              src='/static/money-coffee.png'
              alt='Picture of a coffee cup holding cash money'
            />
            <Text>{checkpoint?.completionText}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <span id='confettiReward' />
          <span id='balloonsReward' />
          <span id='emojiReward' />
          <Button colorScheme='brand' mr={3} onClick={onClose}>
            Continue brewing
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
