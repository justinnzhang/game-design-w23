import { motion } from 'framer-motion';
import {
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Spacer,
  IconButton,
  Progress,
} from '@chakra-ui/react';
import Link from 'next/link';

import { IoHome, IoSave } from 'react-icons/io5';

interface Props {
  tickProgress: number;
  balance: number;
  increment: number;
  expenses: number;
  showEarnedAmount: boolean;
  isFasterTick: boolean;
  lastSaved: Date;
  isSaving: boolean;
  handleSave: () => void;
}

export const HeadingCard = ({
  tickProgress,
  balance,
  increment,
  expenses,
  showEarnedAmount,
  isFasterTick,
  lastSaved,
  isSaving,
  handleSave,
}: Props) => {
  const motionProps = {
    initial: { opacity: 0, y: 0 },
    animate: {
      opacity: 1,
      y: -20,
      transition: { duration: isFasterTick ? 0.1 : 0.9, ease: 'easeOut' },
    },
  };

  const balanceIncreaseMarkup = showEarnedAmount ? (
    <motion.div
      style={{
        position: 'absolute',
        right: 10,
        top: 20,
        overflow: 'visible',
        height: '0px',
      }}
      variants={motionProps}
      animate='animate'
      initial='initial'
    >
      <Text fontSize='xl' fontWeight='medium' p={0} m={0} color='green.100'>
        +{' '}
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(increment * (1 - expenses))}
      </Text>
    </motion.div>
  ) : null;

  return (
    <Box
      p={4}
      spacing={6}
      as={Stack}
      borderRadius={8}
      borderColor='brand.800'
      borderWidth={2}
      bg='linear-gradient(180deg, #342A20 0%, rgba(52, 42, 32, 0.94) 57.29%, rgba(52, 42, 32, 0) 100%), url(/static/components/heading-bg.jpeg)'
      backgroundSize='cover'
    >
      <Flex>
        <Heading color='brand.100'>Coffee.io</Heading>
        <Spacer />
        <IconButton
          icon={<IoHome />}
          aria-label='Home'
          as={Link}
          href='/home'
        />
      </Flex>
      <Stack spacing={1} pb={16} position='relative'>
        <Text color='brand.200' fontWeight='bold' fontSize='sm'>
          EARNINGS
        </Text>
        <Text color='green.100' fontWeight='medium' fontSize='2xl'>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(balance)}
        </Text>
        {balanceIncreaseMarkup}
        <Progress value={tickProgress} size='xs' w='100%' colorScheme='green' />
        <Stack direction='row'>
          <Text color='brand.200'>{`Earning ${Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(increment)}/min`}</Text>
          <Text color='red.300'>{`-${Intl.NumberFormat('en-US', {
            style: 'percent',
            maximumFractionDigits: 2,
          }).format(expenses)}`}</Text>
        </Stack>
        <Text fontSize='lg' color='white' fontWeight='medium'>
          {`${Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(increment * (1 - expenses))}/min`}
        </Text>
      </Stack>
      <Flex>
        <Stack spacing={0}>
          <Text
            color='brand.200'
            fontWeight='bold'
            fontSize='sm'
            textShadow='lg'
          >
            SAVE
          </Text>
          <Text color='white' textShadow='lg'>
            {`Last saved: ${new Intl.DateTimeFormat('en-US', {
              timeStyle: 'long',
            }).format(lastSaved)}`}
          </Text>
        </Stack>
        <Spacer />
        <IconButton
          icon={<IoSave />}
          aria-label='Home'
          colorScheme='green'
          isLoading={isSaving}
          onClick={handleSave}
        />
      </Flex>
    </Box>
  );
};
