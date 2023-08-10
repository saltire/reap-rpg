import type { Config } from 'tailwindcss';


export default {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      header: ['Pirata One', 'serif'],
    },
    extend: {
      fontWeight: {
        bold: '600',
      },
    },
  },
  plugins: [],
} satisfies Config;
