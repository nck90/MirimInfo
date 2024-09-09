// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // app 폴더에 있는 파일들
    './src/pages/**/*.{js,ts,jsx,tsx}', // pages 폴더에 있는 파일들
    './src/components/**/*.{js,ts,jsx,tsx}', // components 폴더에 있는 파일들
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
