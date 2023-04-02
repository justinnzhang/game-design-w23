import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      50: '#F2EDE8',
      100: '#EAE1D9',
      200: '#DAC9BC',
      300: '#C9B29E',
      400: '#B99A81',
      500: '#A88363',
      600: '#8F6C4F',
      700: '#71563F',
      800: '#543F2E',
      900: '#36291E',
      950: '#241B14',
    },
  },
});
