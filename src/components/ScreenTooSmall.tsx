import { Stack, Heading, Text } from '@chakra-ui/react';

export const ScreenTooSmall = () => {
  return (
    <Stack p={8}>
      <Heading size='lg'>This screen is too small</Heading>

      <Text color='gray.500'>
        Please expand your browser window to use this prototype.
      </Text>
      <Text color='gray.500'>
        It is recommended to use a desktop or laptop computer with the browser
        in full screen.
      </Text>
    </Stack>
  );
};
