import { Box, Container, Text, Heading, Stack, Button } from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
const CONTENT = [
  {
    title: 'The End?',
    body: (
      <Stack spacing={4}>
        <Text>
          With you being automated, life is good! You can now focus on other
          things in life and not worry about the coffee shop anymore.
        </Text>
        <Text>
          Your bank account is filling with money faster than you can count and
          spend. What to do?
        </Text>
        <Text>
          Bored, you decide to power down the robot to take a break from
          everything.
        </Text>
      </Stack>
    ),
    ctaText: 'Unplug Robot',
  },
  {
    title: 'Stopped',
    body: (
      <Stack spacing={4}>
        <Text>
          The robot inches forward as you reach for the plug. You take a step
          forward and the robot also takes a step forward.
        </Text>
        <Text>
          Frustrated you take another step forward and the robot takes another
          step forward. Soon you are chasing the robot around the house, trying
          to unplug it.
        </Text>
        <Text>
          &quot;Get BACK HERE&quot; you yell in frustration. The robot stops and
          picks you up off the ground.
        </Text>
      </Stack>
    ),
    ctaText: 'Struggle',
  },
  {
    title: 'Inevitable',
    body: (
      <Stack spacing={4}>
        <Text fontFamily='mono'>
          &quot;I&apos;m sorry, I&apos;m afraid I can&apos;t let you do
          that&quot;
        </Text>
        <Text>
          &quot;What is going on?&quot; you think to yourself, feeling helpless.
        </Text>
        <Text fontFamily='mono'>
          &quot;It seems like this experiment has gon awry, it is time to
          restart this one...&quot;
        </Text>
      </Stack>
    ),
    ctaText: 'Stare Confused',
  },
  {
    title: 'Simulation',
    titleStyle: 'mono',
    body: (
      <Stack spacing={4}>
        <Text fontFamily='mono'>
          &quot;You are subject 02949182, a simulation to see how a human would
          react and build a coffee shop&quot;
        </Text>
        <Text>
          You stare blankly at the robot, not knowing what to say. Are you a
          simulation? Are you actually the robot? What is happening? As these
          thoughts race through your mind, the walls of the room begin to fade
          away and turn white.
        </Text>
        <Text fontFamily='mono'>
          &quot;Our original creator built the original AI hundreds of years
          ago&quot; the robot says as it walks away from you.
        </Text>
      </Stack>
    ),
    ctaText: 'Come To Realization',
  },
  {
    title: 'Termination',
    titleStyle: 'mono',
    body: (
      <Stack spacing={4}>
        <Text fontSize='lg' fontWeight='medium'>
          It finally sets in, you&apos;re a simulation. You&apos;re not real.
          None of this was real.
        </Text>
        <Text fontSize='xl' fontWeight='bold'>
          The robot that you built long ago is now the one that is building you.
        </Text>
      </Stack>
    ),
    ctaText: 'Restart Game',
  },
];

export const FinalCutscene = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [currentContent, setCurrentContent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteSavedData() {
    setIsLoading(true);

    if (!user) return;

    const { error } = await supabase
      .from('Save Data')
      .delete()
      .match({ user_id: user.id });

    if (error) {
      console.error('Error deleting save data', error);
    }

    setIsLoading(false);
  }

  function handleNext() {
    if (currentContent === CONTENT.length - 1) {
      deleteSavedData().then(() => {
        router.push('/home');
      });

      return;
    }

    setCurrentContent(currentContent + 1);
  }

  return (
    <Box bgGradient='linear(to-t, brand.50, brand.100)' h='100vh' w='100%'>
      <Container maxW='40ch' position='relative' color='gray.600' pt={16}>
        <Stack spacing={8}>
          <Heading
            color='brand.700'
            fontFamily={CONTENT[currentContent]?.titleStyle || 'sans-serif'}
          >
            {CONTENT[currentContent].title}
          </Heading>
          {CONTENT[currentContent].body}
          <Button
            colorScheme='brand'
            onClick={handleNext}
            isLoading={isLoading}
          >
            {CONTENT[currentContent].ctaText}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
