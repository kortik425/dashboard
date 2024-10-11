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
        primaryDark: "--primary-dark",
        secondaryDark: "--secondary-dark",
        primaryLight: "--primary-light",
        secondaryLight: "--secondary-light",
      },
    },
  },
  plugins: [],
};
export default config;
