/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaecf6',
          100: '#c6cce5',
          200: '#a1aad4',
          300: '#7c88c3',
          400: '#5766b2',
          500: '#2a3990', // Main primary color
          600: '#23307a',
          700: '#1c2763',
          800: '#151e4d',
          900: '#0e1537',
        },
        secondary: {
          50: '#fef3e6',
          100: '#fde0b9',
          200: '#fbcc8c',
          300: '#fab95f',
          400: '#f8a533',
          500: '#f7941d', // Main secondary color
          600: '#d17c18',
          700: '#ab6413',
          800: '#864d0f',
          900: '#60370a',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'smooth': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
};