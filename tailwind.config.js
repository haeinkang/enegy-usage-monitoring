module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 여기에 src 내부 ts/tsx 파일을 포함시켜야 함
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      colors: {
        customGreen: "#116945",
        customMint: "#E9F0EC",
      },
    },
  },
  plugins: [],
};
