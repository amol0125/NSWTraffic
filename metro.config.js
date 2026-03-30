// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.publicPath = "/NSWTraffic/";

module.exports = config;
