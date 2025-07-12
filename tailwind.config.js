/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f2ff',
          100: '#e5e7ff',
          500: '#5B67EA',
          600: '#4C59D6',
          700: '#3D4AC2',
        },
        secondary: {
          50: '#f1f3f7',
          100: '#e3e7ef',
          500: '#2D3458',
          600: '#252A4A',
          700: '#1D213C',
        },
        accent: {
          50: '#fff1f1',
          100: '#ffe3e3',
          500: '#FF6B6B',
          600: '#FF5252',
          700: '#FF3939',
        },
        surface: '#FFFFFF',
        background: '#F7F8FC',
        success: '#4ECB71',
        warning: '#FFB800',
        error: '#FF4747',
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(91, 103, 234, 0.3)',
      },
    },
  },
  plugins: [],
}