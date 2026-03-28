import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function ComponentLayout() {
  

  return (
    <>
      <Stack>
        <Stack.Screen name="trafficApi" options={{ title: 'Traffic Api' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}