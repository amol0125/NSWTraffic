import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function ComponentLayout() {
  

  return (
    <>
      <Stack>
        <Stack.Screen name="FilterBar" options={{ headerShown: false }} />
        <Stack.Screen name="IncidentCard" options={{ title: 'Inccident Card' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
