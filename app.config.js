import 'dotenv/config';

export default {
  expo: {
    name: "NSWTraffic",
    slug: "NSWTraffic",
    extra: {
      EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    },
  },
};
