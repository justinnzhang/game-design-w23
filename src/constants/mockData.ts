import { UpgradeProps } from '../components/Upgrade';
import { CheckpointProps } from '../components/CheckpointDisplay';
import { CostProps } from '../components/Cost';

export const MOCK_UPGRADE_LIST_DATA: UpgradeProps[] = [
  {
    id: 1,
    name: 'Plain Coffee',
    description: 'A simple cup of coffee.',
    costOfUpgrade: 1,
    numberOfUpgrades: 1,
    increaseInEarnings: 1,
  },
  {
    id: 2,
    name: 'Latte',
    description: 'Espresso with steamed milk and a layer of foam.',
    costOfUpgrade: 12,
    numberOfUpgrades: 0,
    increaseInEarnings: 4.22,
  },
  {
    id: 3,
    name: 'Cappuccino',
    description: 'Espresso with equal parts steamed milk and foam.',
    costOfUpgrade: 102,
    numberOfUpgrades: 0,
    increaseInEarnings: 9.91,
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Espresso with chocolate syrup and steamed milk.',
    costOfUpgrade: 601,
    numberOfUpgrades: 0,
    increaseInEarnings: 62.52,
  },
  {
    id: 5,
    name: 'Americano',
    description: 'Espresso with hot water.',
    costOfUpgrade: 1020,
    numberOfUpgrades: 0,
    increaseInEarnings: 106.61,
  },
  {
    id: 6,
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice.',
    costOfUpgrade: 2568,
    numberOfUpgrades: 0,
    increaseInEarnings: 256.82,
  },
  {
    id: 7,
    name: 'Espresso Macchiato',
    description: 'Espresso with a dollop of foam.',
    costOfUpgrade: 6012,
    numberOfUpgrades: 0,
    increaseInEarnings: 601.22,
  },
  {
    id: 8,
    name: 'Flat White',
    description: 'Espresso with steamed milk and a thin layer of foam.',
    costOfUpgrade: 92741,
    numberOfUpgrades: 0,
    increaseInEarnings: 1283.89,
  },
  {
    id: 9,
    name: 'Affogato',
    description: 'Espresso poured over a scoop of vanilla ice cream.',
    costOfUpgrade: 102831,
    numberOfUpgrades: 0,
    increaseInEarnings: 1428.59,
  },
  {
    id: 10,
    name: 'Café au Lait',
    description: 'Coffee with hot milk.',
    costOfUpgrade: 203852,
    numberOfUpgrades: 0,
    increaseInEarnings: 2058.71,
  },
  {
    id: 11,
    name: 'Café con Leche',
    description: 'Coffee with hot milk and sweetened condensed milk.',
    costOfUpgrade: 671928,
    numberOfUpgrades: 0,
    increaseInEarnings: 6719.28,
  },
  {
    id: 12,
    name: 'Café Mocha',
    description: 'Coffee with chocolate syrup and steamed milk.',
    costOfUpgrade: 1028310,
    numberOfUpgrades: 0,
    increaseInEarnings: 10283.1,
  },
  {
    id: 13,
    name: 'Cold Brew Coffee',
    description: 'Cold coffee steeped overnight',
    costOfUpgrade: 2038520,
    numberOfUpgrades: 0,
    increaseInEarnings: 20385.2,
  },
  {
    id: 14,
    name: 'Nitro Cold Brew',
    description: 'Cold brew coffee infused with nitrogen.',
    costOfUpgrade: 6719280,
    numberOfUpgrades: 0,
    increaseInEarnings: 67192.8,
  },
  {
    id: 15,
    name: 'Gold Coffee',
    description: 'The best coffee in the world.',
    costOfUpgrade: 10283100,
    numberOfUpgrades: 0,
    increaseInEarnings: 102831,
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
      "What in the 100k of coffee is going on here?! That's almost half a ferrari. What if that ferrari was made out of coffee? Can ferrari's run on coffee? I don't know, but if you make 1 million dollars, you can find out!",
  },
  {
    id: 4,
    name: 'First Million',
    description: 'Make your first million dollars',
    earningThreshold: 1000000,
    completionText:
      "You made your first million dollars! You're a coffee tycoon! Starbucks are shaking in their boots! Or maybe they're just shaking because they're so caffeinated. Either way, you're a coffee tycoon!",
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
