const srcFolder = './src';
const buildFolder = './dist';
export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
  },
  htmlLayoutFolder: {
    src: `${srcFolder}/layout`,
  },
  mainJavascriptFile: {
    src: `${srcFolder}/javascript/main.js`,
  },
  javascriptFolder: {
    src: `${srcFolder}/javascript/**/*.js`,
    dist: `${buildFolder}/javascript`,
  },
  stylesFolder: {
    src: `${srcFolder}/scss/**/*.scss`,
    dist: `${buildFolder}/css`,
  },
  assetsFolder: {
    src: `${srcFolder}/assets`,
    dist: `${buildFolder}/assets`,
  },
  imagesFolder: {
    src: `${srcFolder}/assets/images`,
    dist: `${buildFolder}/assets/images`,
  },
  svgSpritesFolder: {
    src: `${srcFolder}/assets/images/svg/**.svg`,
  },
};