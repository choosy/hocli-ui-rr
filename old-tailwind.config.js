/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1590px", // 1600px - 10px
        "3xl": "1910px", // 1920px - 10px
        "4xl": "2038px", // 2048px - 10px
        "5xl": "2550px", // 20560px - 10px
        "6xl": "3830px", // 3830px - 10px
      },

      backgroundImage: {
        "hero-sm":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-1024px.jpg")',

        "hero-xl":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-1280px.jpg")',

        "hero-2xl":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-1600px.jpg")',

        "hero-3xl":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-1920px.jpg")',

        "hero-4xl":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-2048px.jpg")',

        "hero-5xl":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-2560px.jpg")',

        "hero-6xl":
          'linear-gradient(180deg, rgba(22, 22, 23, 0.00) 50%, #161617 85%), url("/images/ethereal-moon-hero-picture-3840px.jpg")',

        "custom-gradient":
          "linear-gradient(180deg, rgba(22, 22, 23, 0.45) 0%, rgba(22, 22, 23, 0) 50%), linear-gradient(180deg, rgba(22, 22, 23, 0.9) 0%, rgba(22, 22, 23, 0) 100%)",
      },

      colors: {
        "primary-black": "#161617",
        "secondary-black": "#242426",
        "popup-bg": "#202022",
        "popup-price": "#C99D66",
        "light-gray": "#BFCCC9",
        "medium-gray": "#555b59",
        "accent-yellow": "#F1A818",
        "accent-yellow-hover": "#E29A0E",
        "background-header": "rgba(36, 36, 38, 0.30)",
        gray: "#7A8280",
        olive: "#687063",
        "olive-strong": "#404c3a",
        stroke: "#555D50",
        error: "#C97866",
        delivered: "#6CC855",
        shipped: "#D0CA39",
        white: "#FFFFFF",
      },

      fontFamily: {
        moderustic: ["Moderustic", "sans-serif"],
      },

      textShadow: {
        custom: "0px 0px 20px rgba(191, 204, 201, 0.50)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-custom": {
          textShadow: "0px 0px 20px rgba(191, 204, 201, 0.50)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
