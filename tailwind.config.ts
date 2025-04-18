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
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          grey10:"var(--grey10)",
          grey50:"var(--grey50)",
          greyopac:"var(--greyopac)",
          whiteopac:"var(--whiteopac)",
          blackopac:"var(--blackopac)",
          destructive:"var(--destructive)",
  
        },
        fontFamily: {
          special:["'Special Elite'", "cursive"],
          poppins: ["'Poppins'", "sans-serif"],
        }
      },
    },
    plugins: [],
  }
  