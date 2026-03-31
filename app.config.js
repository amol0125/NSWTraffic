export default {
  name: "NSWTraffic",
  slug: "NSWTraffic",

  web: {
    output: "static",
    baseUrl: "/NSWTraffic",
    favicon: "./assets/images/favicon.png"
  },

  extra: {
    API_KEY: process.env.API_KEY,
    router: {
      origin: "https://amol0125.github.io/NSWTraffic"
    }
  },

  orientation: "portrait",
  userInterfaceStyle: "automatic",

  ios: {
    supportsTablet: true
  },

  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png"
    },
    predictiveBackGestureEnabled: false
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000"
        }
      }
    ]
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true
  }
};
