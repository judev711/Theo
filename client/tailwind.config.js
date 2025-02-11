import { content as _content, plugin } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  _content(), // Appel de la fonction flowbite.content()
];
export const theme = {
  extend: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  darkmode: "class",
};

export const plugins = [
  plugin(), // Ajout du plugin Flowbite
];
