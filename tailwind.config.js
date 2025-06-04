/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06509B",
        secondary: "#0760B2",
        tertiary: "#1F7CC9",
        quaternary: "#45A1E4",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        customtext: "#FFFFFF",
      },
    },
  },
  plugins: [],
}

