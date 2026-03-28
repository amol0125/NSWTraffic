// app/incident/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";
import { saveIncident } from "../(storage)/savedIncidents";
import { useEffect, useState } from "react";
import { fetchHistorical } from "../(services)/trafficApi";

export default function IncidentDetails() {
  const { id } = useLocalSearchParams();
  const [incident, setIncident] = useState<any>(null);

  useEffect(() => {
    fetchHistorical(process.env.EXPO_PUBLIC_API_KEY!).then((list) => {
      setIncident(list.find((i: any) => i.incidentId == id));
    });
  }, []);

  if (!incident) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{incident.mainCategory}</Text>
      <Text>{incident.mainStreet}</Text>
      <Text>{incident.region}</Text>
      <Text>{incident.adviceA}</Text>

      <Button title="Save Incident" onPress={() => saveIncident(incident)} />
    </View>
  );
}
