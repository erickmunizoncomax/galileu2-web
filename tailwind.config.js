/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'avva-red': '#BA0808',
      },
      pageBreakBefore: {
        always: 'always',
      }
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.page-break-before-always': {
          'page-break-before': 'always',
        },
      });
    },
  ],
}