export const parentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const childVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: [0, 0.1, 0.8, 1],
    },
  },
};
