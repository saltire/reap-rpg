import type { Config } from 'tailwindcss';


export default {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      header: ['Pirata One', 'serif'],
    },
    extend: {
      fontWeight: {
        normal: '400',
        semi: '600',
        bold: '700',
      },
      rotate: {
        30: '30deg',
        60: '60deg',
        120: '120deg',
        240: '240deg',
        300: '300deg',
      },
    },
  },
  plugins: [],
} satisfies Config;
