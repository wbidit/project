/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d8d9df',
          300: '#b6b8c2',
          400: '#8f919f',
          500: '#6b6d7c',
          600: '#4d4f5c',
          700: '#3d3e48',
          800: '#27272e',
          900: '#18181b',
        },
        accent: {
          primary: '#7C3AED',
          secondary: '#2DD4BF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}