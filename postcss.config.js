// in postcss.config.js
const postcssImport = require(`postcss-import`);
const postcssCssPresetEnv = require(`postcss-preset-env`);
const autoprefixer = require(`autoprefixer`);

module.exports = () => ({
  plugins: [postcssImport(), postcssCssPresetEnv(), autoprefixer()],
});
