import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function ComponentLayout() {
  

  return (
    <>
      <Stack>
        <Stack.Screen name="savedIncidents" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}