/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131313",
        emerald:'#2AB38E',
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        }
       
      },
      fontFamily: {
        pText:["Righteous-Regular","sans-serif"],
        pBlack:["Roboto-Black","sans-serif"],
        pBold:["Roboto-Bold","sans-serif"],
        pItalic:["Roboto-Italic","sans-serif"],
        pMedium:["Roboto-Medium","sans-serif"],
        pRegular:["Roboto-Regular","sans-serif"],
        pThin:["Roboto-Thin","sans-serif"]
      },
      fontSize: {
        base: '10px', // Set the base font size to 10px
      },
      spacing: {
        '1':"10px",
        '2':'20px',
         '3': '30px',
        '4': '40px', // 4 * 10px
        '5': '50px', // 5 * 10px
        '16':'16px'
        // Add any other spacing adjustments needed
      },
    },
  },
  plugins: [],
};
