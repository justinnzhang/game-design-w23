import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { childVariants, parentVariants } from '@/animation';

const CONTENT: {
  id: string;
  title: string;
  titleStyle?: string;
  body: {
    id: string;
    text: string;
    style: string;
    size?: string;
    fontWeight?: string;
  }[];
  ctaText: string;
}[] = [
  {
    id: '65556dac-394e-4db8-b5ba-3cd3fd025657',
    title: 'The End?',
    body: [
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2174',
        text: 'With you being automated, life is good! You can now focus on other things in life and not worry about the coffee shop anymore.',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2175',
        text: 'Your bank account is filling with money faster than you can count and spend. What to do?',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2176',
        text: 'Bored, you decide to power down the robot to take a break from everything.',
        style: 'sans-serif',
      },
    ],
    ctaText: 'Unplug Robot',
  },
  {
    id: '36e70951-d0ca-4c6a-978a-ea668d81f921',
    title: 'Stopped',
    body: [
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2177',
        text: 'The robot inches forward as you reach for the plug. You take a step forward and the robot also takes a step forward.',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2178',
        text: 'Frustrated you take another step forward and the robot takes another step forward. Soon you are chasing the robot around the house, trying to unplug it.',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2179',
        text: '"Get BACK HERE" you yell in frustration. The robot stops and picks you up off the ground.',
        style: 'sans-serif',
      },
    ],
    ctaText: 'Struggle',
  },
  {
    id: '70fdcad6-6bb4-4241-98ed-3c403c09be59',
    title: 'Inevitable',
    body: [
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2180',
        text: `"I'm sorry, I'm afraid I can't let you do that"`,
        style: 'mono',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2181',
        text: '"What is going on?" you think to yourself, feeling helpless.',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2182',
        text: '"It seems like this experiment has gone awry, it is time to restart this one..."',
        style: 'mono',
      },
    ],
    ctaText: 'Stare Confused',
  },
  {
    id: 'dc08f705-2777-4ac9-b236-a94624363bb3',
    title: 'Simulation',
    titleStyle: 'mono',
    body: [
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2183',
        text: '"You are subject 02949182, a simulation to see how a human would react and build a coffee shop"',
        style: 'mono',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2184',
        text: 'You stare blankly at the robot, not knowing what to say. Are you a simulation? Are you actually the robot? What is happening?',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2184',
        text: 'As these thoughts race through your mind, the walls of the room begin to fade away and turn white.',
        style: 'sans-serif',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2185',
        text: '"Our original creator built the original AI hundreds of years ago" the robot says as it walks away from you.',
        style: 'mono',
      },
    ],
    ctaText: 'Come To Realization',
  },
  {
    id: 'd184b783-ce45-475a-8398-7113a36e7c91',
    title: 'Termination',
    titleStyle: 'mono',
    body: [
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2186',
        text: "It finally sets in, you're a simulation. You're not real. None of this was real.",
        style: 'sans-serif',
        fontWeight: 'medium',
      },
      {
        id: 'c7aec48d-4b2b-4d1f-8620-cc6b58dd2187',
        text: 'The robot that you built long ago is now the one that is building you.',
        style: 'sans-serif',
        size: '2xl',
        fontWeight: 'bold',
      },
    ],
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
    <Box
      bgGradient={
        currentContent < 3 ? 'linear(to-t, brand.50, brand.100)' : 'white'
      }
      h='100vh'
      w='100%'
    >
      <Container maxW='40ch' position='relative' color='gray.600' pt={16}>
        <AnimatePresence>
          {CONTENT.map((content, index) => {
            if (index !== currentContent) return null;

            return (
              <motion.div
                variants={parentVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                key={content.id}
                style={{ position: 'absolute' }}
              >
                <Stack spacing={8} key={content.id}>
                  <Heading
                    color='brand.700'
                    fontFamily={content?.titleStyle || 'sans-serif'}
                    as={motion.h1}
                    variants={childVariants}
                    key={`heading-${content.id}`}
                  >
                    {CONTENT[currentContent].title}
                  </Heading>
                  <Stack spacing={4}>
                    {content.body.map((bodyContent) => (
                      <Text
                        as={motion.p}
                        variants={childVariants}
                        key={bodyContent.id}
                        fontSize={bodyContent?.size || 'md'}
                        fontWeight={bodyContent?.fontWeight || 'normal'}
                        fontFamily={bodyContent.style}
                      >
                        {bodyContent.text}
                      </Text>
                    ))}
                  </Stack>
                  <Button
                    colorScheme='brand'
                    onClick={handleNext}
                    isLoading={isLoading}
                    as={motion.button}
                    variants={childVariants}
                    key={`cta-${content.id}`}
                  >
                    {CONTENT[currentContent].ctaText}
                  </Button>
                </Stack>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Container>
    </Box>
  );
};
