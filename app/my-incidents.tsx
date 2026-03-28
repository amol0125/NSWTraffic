// app/my-incidents.tsx
import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { loadSaved } from "./(storage)/savedIncidents";
import IncidentCard from "./(components)/IncidentCard";

export default function MyIncidents() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    loadSaved().then(setSaved);
  }, []);

  if (saved.length === 0) return <Text>No saved incidents</Text>;

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.incidentId.toString()}
        renderItem={({ item }) => <IncidentCard item={item} />}
      />
    </View>
  );
}
