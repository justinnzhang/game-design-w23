import { Stack, Text, Progress, chakra } from '@chakra-ui/react';
import { CARD_STYLE_PROPS } from '@/constants/styling';

export interface CheckpointProps {
  id: number;
  name: string;
  description: string;
  earningThreshold: number;
  completionText: string;
}

interface Props {
  checkpoint: CheckpointProps | false;
  currentBalance: number;
}

export const CheckpointDisplay = ({ checkpoint, currentBalance }: Props) => {
  if (!checkpoint) {
    return (
      <Stack bg='brand.900' py={6} px={8} borderRadius={8} spacing={2}>
        <Text color='brand.100' fontWeight='medium' fontSize='xl'>
          Congratulations!
        </Text>
        <Text color='brand.200'>Your coffee shop is thriving and well</Text>
      </Stack>
    );
  }

  const { name, description, earningThreshold } = checkpoint;

  return (
    <>
      <Stack bg='brand.900' p={4} borderRadius={8} spacing={2}>
        <Text fontSize='xs' fontWeight='bold' color='brand.200'>
          NEXT CHECKPOINT
        </Text>
        <Stack spacing={0}>
          <Text color='brand.100' fontWeight='medium' fontSize='xl'>
            {name}
          </Text>
          <Text color='brand.200'>{description}</Text>
        </Stack>
        <Stack spacing={2}>
          <Text color='gray.100'>
            Goal Progress{' '}
            <chakra.span color='gray.400'>
              {((currentBalance / earningThreshold) * 100).toFixed(2)}%
            </chakra.span>
          </Text>
          <Progress
            value={(currentBalance / earningThreshold) * 100}
            size='xs'
            w='100%'
            colorScheme='green'
          />
        </Stack>
      </Stack>
    </>
  );
};
