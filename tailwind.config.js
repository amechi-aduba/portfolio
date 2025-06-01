/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F84E56",
        secondary: "#DE2A32",
        tertiary: "#C5080F",
        quaternary: "#AB060C",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        customtext: "#172534",
      },
    },
  },
  plugins: [],
}

