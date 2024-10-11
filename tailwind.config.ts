import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "var(--primary-dark)",
        secondaryDark: "var(--secondary-dark)",
        primaryLight: "var(--primary-light)",
        secondaryLight: "var(--secondary-light)",
      },
    },
  },
  plugins: [],
};
export default config;
