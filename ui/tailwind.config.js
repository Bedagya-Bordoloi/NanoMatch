/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Grotesk"', 'monospace'],
      },
      colors: {
        neon: {
          cyan: '#00f2ff',
          magenta: '#ff00ff',
          green: '#00ff9f',
        }
      }
    },
  },
  plugins: [],
}

