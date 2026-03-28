import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

//import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="(incident)" options={{ headerShown: false }} />
        <Stack.Screen name="my-incidents" options={{ title: 'My Incidents' }} />
        <Stack.Screen name="(components)" options={{ headerShown: false }} />
        <Stack.Screen name="(servicess)" options={{ headerShown: false }} />
        <Stack.Screen name="(storage)" options={{ headerShown: false }} />
        <Stack.Screen name="(utils)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
