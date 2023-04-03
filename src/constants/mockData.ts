import { UpgradeProps } from '../components/Upgrade';
import { CheckpointProps } from '../components/CheckpointDisplay';
import { CostProps } from '../components/Cost';
import { BoostProps } from '@/components/Boost';

export const MOCK_UPGRADE_LIST_DATA: UpgradeProps[] = [
  {
    id: 1,
    name: 'Plain Coffee Machine',
    description: 'A simple cup of coffee.',
    costOfUpgrade: 1,
    numberOfUpgrades: 1,
    increaseInEarnings: 1,
    imageUrl: '/static/upgrades/plain-coffee.png',
  },
  {
    id: 2,
    name: 'Latte Machine',
    description: 'Espresso with steamed milk and a layer of foam.',
    costOfUpgrade: 12,
    numberOfUpgrades: 0,
    increaseInEarnings: 4.22,
    imageUrl: '/static/upgrades/latte.png',
  },
  {
    id: 3,
    name: 'Cappuccino Machine',
    description: 'Espresso with equal parts steamed milk and foam.',
    costOfUpgrade: 102,
    numberOfUpgrades: 0,
    increaseInEarnings: 9.91,
    imageUrl: '/static/upgrades/cappuccino.webp',
  },
  {
    id: 4,
    name: 'Mocha Machine',
    description: 'Espresso with chocolate syrup and steamed milk.',
    costOfUpgrade: 601,
    numberOfUpgrades: 0,
    increaseInEarnings: 62.52,
    imageUrl: '/static/upgrades/mocha.png',
  },
  {
    id: 5,
    name: 'Americano Machine',
    description: 'Espresso with hot water.',
    costOfUpgrade: 1020,
    numberOfUpgrades: 0,
    increaseInEarnings: 106.61,
    imageUrl: '/static/upgrades/americano.webp',
  },
  {
    id: 6,
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice.',
    costOfUpgrade: 2568,
    numberOfUpgrades: 0,
    increaseInEarnings: 256.82,
    imageUrl: '/static/upgrades/iced-coffee.png',
  },
  {
    id: 7,
    name: 'Espresso Macchiato Machine',
    description: 'Espresso with a dollop of foam.',
    costOfUpgrade: 6012,
    numberOfUpgrades: 0,
    increaseInEarnings: 601.22,
    imageUrl: '/static/upgrades/espresso-macchiato.webp',
  },
  {
    id: 8,
    name: 'Flat White Machine',
    description: 'Espresso with steamed milk and a thin layer of foam.',
    costOfUpgrade: 92741,
    numberOfUpgrades: 0,
    increaseInEarnings: 1283.89,
    imageUrl: '/static/upgrades/flat-white.webp',
  },
  {
    id: 9,
    name: 'Affogato Machine',
    description: 'Espresso poured over a scoop of vanilla ice cream.',
    costOfUpgrade: 102831,
    numberOfUpgrades: 0,
    increaseInEarnings: 1428.59,
    imageUrl: '/static/upgrades/affogato.webp',
  },
  {
    id: 10,
    name: 'Café au Lait Machine',
    description: 'Coffee with hot milk.',
    costOfUpgrade: 203852,
    numberOfUpgrades: 0,
    increaseInEarnings: 2058.71,
    imageUrl: '/static/upgrades/cafe-au-lait.webp',
  },
  {
    id: 11,
    name: 'Café con Leche Machine',
    description: 'Coffee with hot milk and sweetened condensed milk.',
    costOfUpgrade: 671928,
    numberOfUpgrades: 0,
    increaseInEarnings: 6719.28,
    imageUrl: '/static/upgrades/cafe-con-leche.png',
  },
  {
    id: 12,
    name: 'Café Mocha Machine',
    description: 'Coffee with chocolate syrup and steamed milk.',
    costOfUpgrade: 1028310,
    numberOfUpgrades: 0,
    increaseInEarnings: 10283.1,
    imageUrl: '/static/upgrades/cafe-mocha.png',
  },
  {
    id: 13,
    name: 'Cold Brew Coffee Machine',
    description: 'Cold coffee steeped overnight',
    costOfUpgrade: 2038520,
    numberOfUpgrades: 0,
    increaseInEarnings: 20385.2,
    imageUrl: '/static/upgrades/cold-brew.webp',
  },
  {
    id: 14,
    name: 'Nitro Cold Brew Machine',
    description: 'Cold brew coffee infused with nitrogen.',
    costOfUpgrade: 6719280,
    numberOfUpgrades: 0,
    increaseInEarnings: 67192.8,
    imageUrl: '/static/upgrades/nitro-cold-brew.png',
  },
  {
    id: 15,
    name: 'Gold Coffee Machine',
    description: 'The best coffee in the world.',
    costOfUpgrade: 10283100,
    numberOfUpgrades: 0,
    increaseInEarnings: 102831,
    imageUrl: '/static/upgrades/gold-coffee.png',
  },
];

export const MOCK_CHECKPOINTS_DATA: CheckpointProps[] = [
  {
    id: 1,
    name: 'First Thousand',
    description: 'Make your first thousand dollars.',
    earningThreshold: 1000,
    completionText:
      'Holy coffee-moly! You made your first thousand dollars! This is a great start! Keep going! Just imagine what you can do with 10 thousand dollars!',
  },
  {
    id: 2,
    name: 'First 10 Thousand',
    description: 'Make your first 10 thousand dollars',
    earningThreshold: 10000,
    completionText:
      "Latte me tell you, that's a surprise! You made your first 10 thousand dollars! That's a lot of coffee sold! Imagine if you could make 100 thousand dollars!",
  },
  {
    id: 3,
    name: 'First 100 Thousand',
    description: 'Make your first 100 thousand dollars',
    earningThreshold: 100000,
    completionText:
      "What in the 100k of coffee is going on here?! That's almost half a Ferrari. What if that Ferrari was made out of coffee? Can Ferrari's run on coffee? As you look around your store, you start to itch for more technology. Should you start some automation?",
  },
  {
    id: 4,
    name: 'First Million',
    description: 'Make your first million dollars',
    earningThreshold: 1000000,
    completionText:
      "You made your first million dollars! You're a coffee tycoon! Starbucks are shaking in their boots! Or maybe they're just shaking because they're so caffeinated. Either way, you're a coffee tycoon! You make up your mind; it's time to use your tech experience!",
  },
  {
    id: 4,
    name: 'First Million',
    description: 'Make your first million dollars',
    earningThreshold: 1000000,
    completionText:
      "You made your first million dollars! You're a coffee tycoon! Starbucks are shaking in their boots! Or maybe they're just shaking because they're so caffeinated. Either way, you're a coffee tycoon! You make up your mind; it's time to use your tech experience!",
  },
  {
    id: 5,
    name: 'Automate Your Cashiers',
    description: 'Purchase the cost of "Automate Cashiers"',
    completionText:
      "You made your first million dollars! You're a coffee tycoon! Starbucks are shaking in their boots! Or maybe they're just shaking because they're so caffeinated. Either way, you're a coffee tycoon! You make up your mind; it's time to use your tech experience!",
  },
  {
    id: 5,
    name: 'Automate Yourself',
    description: 'Purchase the cost of "Automate Yourself"',
    completionText:
      "You made your first million dollars! You're a coffee tycoon! Starbucks are shaking in their boots! Or maybe they're just shaking because they're so caffeinated. Either way, you're a coffee tycoon! You make up your mind; it's time to use your tech experience!",
  },
];

// 7 expenses that are related to a coffee shop, each one being more important than the last
export const MOCK_COST_DATA: CostProps[] = [
  {
    id: 1,
    name: 'Better napkins',
    description: 'Find a better supplier of Napkins',
    costOfUpgrade: 1000,
    purchased: false,
  },
  {
    id: 2,
    name: 'Better cups',
    description: 'Find a better supplier of cups',
    costOfUpgrade: 10000,
    purchased: false,
  },
  {
    id: 3,
    name: 'Better coffee beans',
    description: 'Find a better supplier of coffee beans',
    costOfUpgrade: 50000,
    purchased: false,
  },
  {
    id: 4,
    name: 'Better renting terms',
    description: 'Negotiate a better deal on rent',
    costOfUpgrade: 100000,
    purchased: false,
  },
  {
    id: 5,
    name: 'Fancier coffee machines',
    description: 'More efficient coffee machines',
    costOfUpgrade: 500000,
    purchased: false,
  },
  {
    id: 6,
    name: 'Automate Cashiers',
    description: 'Automate cashiers to reduce labor costs',
    costOfUpgrade: 1000000,
    purchased: false,
  },
  {
    id: 7,
    name: 'Automate Yourself',
    description: 'Replace yourself with artificial intelligence',
    costOfUpgrade: 100000000,
    purchased: false,
  },
];

export const MOCK_BOOST_DATA: BoostProps[] = [
  {
    id: 1,
    name: 'Run an advertisement on the radio',
    purchased: false,
    cost: 250,
    description:
      'Run an advertisement on the radio, after all the only people who drink coffee are old, and old people listen to the radio.',
    multiplier: 2,
    duration: 30,
  },
  {
    id: 2,
    name: 'Run an advertisement at the superbowl',
    purchased: false,
    cost: 3000000,
    description:
      "Run an advertisement at the superbowl, the world's most expensive advertisement spot. You will be sure to get a lot of customers. Hopefully they're repeat customers cause this is expenseive.",
    multiplier: 125,
    duration: 60,
  },
  {
    id: 3,
    name: 'Get a Robert Downey Jr. endorsement',
    purchased: false,
    cost: 50000,
    description:
      'Get a Robert Downey Jr. endorsement, afterall he is Iron Man so if Iron Man drinks your coffee, everyone will drink your coffee. Right?',
    multiplier: 5,
    duration: 45,
  },
  {
    id: 4,
    name: 'Create a fake rumor that drinking coffee makes you fly',
    purchased: false,
    cost: 5000,
    description:
      'Create a fake rumor that drinking coffee makes you fly. People will flock to your coffee shop hoping to take flight. Disclaimer: We do not recommend jumping off a building after drinking coffee.',
    multiplier: 6,
    duration: 30,
  },
  {
    id: 5,
    name: 'Offer a coffee that tastes like bacon',
    purchased: false,
    cost: 2000,
    description:
      'Offer a coffee that tastes like bacon. Who needs breakfast when you can have a coffee that tastes like breakfast?',
    multiplier: 2.5,
    duration: 15,
  },
  {
    id: 6,
    name: 'Partner with the Tooth Fairy to promote your coffee',
    purchased: false,
    cost: 5000000,
    description:
      'Partner with the Tooth Fairy to promote your coffee. She may be small, but she has a big influence over children. With her help, your coffee will become the new bedtime drink of choice.',
    multiplier: 100,
    duration: 120,
  },
  {
    id: 7,

    name: 'Train monkeys to make coffee for you',
    purchased: false,
    cost: 100000,
    description:
      'Train monkeys to make coffee for you. They may not be the best baristas, but they are sure to draw a crowd. Disclaimer: Please do not let the monkeys handle hot liquids.',
    multiplier: 25,
    duration: 60,
  },
];

export const CONTRIBUTORS_LIST: string[] = [
  'Justin Zhang',
  'Matthew Danics',
  'Victoria Lu',
  'Wendy Li',
  'Raahim Salman',
];

export const TECH_STACK_LIST: {
  name: string;
  link: string;
  description: string;
  logoKey: string;
}[] = [
  {
    name: 'React',
    link: 'https://react.dev/',
    description: 'Frontend Framework',
    logoKey: '/static/logos/react-logo.png',
  },
  {
    name: 'Next.js',
    link: 'https://nextjs.org/',
    description: 'Meta-Framework for Server Side Rendering',
    logoKey: '/static/logos/nextjs.png',
  },
  {
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    description: 'Language & Typing',
    logoKey: '/static/logos/typescript.png',
  },
  {
    name: 'Framer Motion',
    link: 'https://www.framer.com/motion/',
    description: 'Animations',
    logoKey: '/static/logos/framer-motion.png',
  },
  {
    name: 'Chakra-UI',
    link: 'https://chakra-ui.com/',
    description: 'Components & Styling',
    logoKey: '/static/logos/chakra-ui.jpeg',
  },
  {
    name: 'Vercel',
    link: 'https://vercel.com/',
    description: 'Hosting, Analytics, & CI/CD',
    logoKey: '/static/logos/vercel.png',
  },
  {
    name: 'Supabase',
    link: 'https://supabase.io/',
    description: 'Database & Authentication',
    logoKey: '/static/logos/supabase.png',
  },
];
