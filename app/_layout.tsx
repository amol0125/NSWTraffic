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
        <Stack.Screen name="index" options={{ headerShown: false }} /> 
        <Stack.Screen name="saved" options={{ headerShown: false }} />   
        <Stack.Screen name="results" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}