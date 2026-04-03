// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// REQUIRED for GitHub Pages subfolder hosting
config.transformer.publicPath = "/NSWTraffic/";

module.exports = config;