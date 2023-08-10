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
        bold: '600',
        black: '700',
      },
    },
  },
  plugins: [],
} satisfies Config;
