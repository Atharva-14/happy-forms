/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light: "#d3d3d3",
        "text-gray-1000": "#0D0D0D",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "custom-lg": "0px 12px 12px -6px rgba(0, 0, 0, 0.03)",
        "custom-md": "0px 6px 6px -3px rgba(0, 0, 0, 0.03)",
        "custom-sm": "0px 3px 3px -1.5px rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
