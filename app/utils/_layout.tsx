import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function ComponentLayout() {
  

  return (
    <>
      <Stack>
        <Stack.Screen name="capitaliseWords" options={{ title: 'Capitalise Words' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
