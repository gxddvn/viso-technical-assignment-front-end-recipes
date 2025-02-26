/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        mainColor: "var(--main-color)",
        sideColor: "var(--side-color)",
      },
    },
  },
  plugins: [],
}

