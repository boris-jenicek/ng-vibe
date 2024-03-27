const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    {
      pattern: /gap-./,
    },
    {
      pattern: /col-span-./,
    },
    {
      pattern: /grid-cols-./,
    },
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        colors: {
          0: '#fdfcfc', // postojeća
          5: '#f1f3f5', // dodana
          10: '#e9ecef', // postojeća
          15: '#e2e6e9', // dodana
          20: '#dee2e6', // postojeća
          25: '#d6dbdf', // dodana
          30: '#ced4da', // postojeća
          35: '#c2c7cc', // dodana
          40: '#adb5bd', // postojeća
          45: '#9aa5af', // dodana
          50: '#6c757d', // postojeća
          55: '#5e666e', // dodana
          60: '#495057', // postojeća
          65: '#3c4248', // dodana
          70: '#343a40', // postojeća
          75: '#2c3236', // dodana
          80: '#212529', // postojeća
          85: '#1a1e21', // dodana
          90: '#121212', // postojeća
        },
        gray: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#121212',
        },
      },
    },
    fontFamily: {
      body: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
  },
  plugins: [
    createThemes(
      {
        light: {
          primary: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf', // primary
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          },
          text: {
            10: '#121212',
            20: '#212529',
          },
          secondary: {
            50: '#f1e4e4',
            100: '#dbc8c8',
            200: '#c4a7a7',
            300: '#ac8585',
            400: '#946969',
            500: '#7d4d4d',
            600: '#694343',
            700: '#553939',
            800: '#412e2e',
            900: '#2e2323',
          },
          surface: {
            10: '#ffffff',
            20: '#f8f9fa',
            30: '#e9ecef',
            40: '#dee2e6',
            50: '#ced4da',
            60: '#6c757d',
            70: '#495057',
            80: '#343a40',
          },
        },
        dark: {
          primary: {
            50: '#dbe7e5',
            100: '#c6dedb',
            200: '#a0c5c2',
            300: '#7badab',
            400: '#569599',
            500: '#417e7d',
            600: '#36676b',
            700: '#2d5358',
            800: '#244546',
            900: '#1d383a',
          },
          text: {
            10: '#ffffff',
            20: '#adb5bd',
          },
          secondary: {
            50: '#b58a8a',
            100: '#a17878',
            200: '#8d6666',
            300: '#795555',
            400: '#654343',
            500: '#513232',
            600: '#3d2424',
            700: '#291515',
            800: '#150707',
            900: '#0a0000',
          },
          surface: {
            10: '#212529',
            20: '#2c3236', //
            30: '#343a40', // koristi se za tablicu za sada
            40: '#3c4248',
            50: '#495057',
            60: '#6c757d',
            70: '#9aa5af',
            80: '#adb5bd',
          },
        },
      },
      {
        defaultTheme: {
          //light: 'light',
          //dark: 'dark',
        },
        strict: true,
      }
    ),
  ],
};
