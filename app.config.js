import 'dotenv/config';

export default {
  expo: {
    name: "NSWTraffic",
    slug: "NSWTraffic",

    // 👇 Add your web config here
    web: {
      output: "server",
      baseUrl: "/NSWTraffic",
      favicon: "./assets/images/favicon.png"
    },

    extra: {
      EXPO_PUBLIC_API_KEY: `apikey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEVXZuWXVGQXFITTgyeEl0bTNUOGtrNVNrYkQzUGdzZUk5SzZpV21lYkw4IiwiaWF0IjoxNzc0MTY4MDc3fQ.7U3cpWOtbGxt1-8zhHqm1gK6H1dIuDZPLEhHRdedF0Y`,
    },

    // 👇 Keep your other config here too
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
  }
};
