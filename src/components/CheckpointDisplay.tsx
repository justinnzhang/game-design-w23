import { Stack, Text, Progress, chakra } from "@chakra-ui/react";
import { CARD_STYLE_PROPS } from "@/constants/styling";

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
      <Stack bg="blue.900" py={6} px={8} borderRadius={8} spacing={2}>
        <Text fontSize="md" color="blue.200">
          Congrats on finishing all the checkpoints! 🎉
        </Text>
      </Stack>
    );
  }

  const { name, description, earningThreshold } = checkpoint;

  return (
    <>
      <Stack {...CARD_STYLE_PROPS}>
        <Text fontSize="sm" fontWeight="bold" color="blue.200">
          Next Checkpoint
        </Text>
        <Stack spacing={0}>
          <Text color="blue.50" fontWeight="medium" fontSize="lg">
            {name}
          </Text>
          <Text color="blue.200">{description}</Text>
        </Stack>
        <Stack spacing={2}>
          <Text color="gray.100">
            Goal Progress{" "}
            <chakra.span color="gray.400">
              {((currentBalance / earningThreshold) * 100).toFixed(2)}%
            </chakra.span>
          </Text>
          <Progress
            value={(currentBalance / earningThreshold) * 100}
            size="xs"
            w="100%"
            colorScheme="green"
          />
        </Stack>
      </Stack>
    </>
  );
};
