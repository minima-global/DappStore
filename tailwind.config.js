import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      stone: colors.stone,
      green: colors.green,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      primary: '#31CEFF',
      'status-red': '#FF627E',
      'core-black-contrast-1': '#17191C',
      'core-black-contrast-2': '#282B2E',
      'core-black-contrast-3': '#464C4F',
      'core-grey-60': '#BDBDC4',
      'core-grey-5': '#F9F9FA',
    },
    extend: {
      backgroundImage: {
        hero: "url('../public/assets/abstract-3840x2160-colorful-4k-24048.jpg')",
      },
    },
  },
  plugins: [],
};
