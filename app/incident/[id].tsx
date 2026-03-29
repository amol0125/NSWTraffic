import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { fetchIncidents } from "../../src/services/trafficApi";
import type { Incident } from "../../src/types/Incident";


export default function IncidentDetails() {
  const { id } = useLocalSearchParams();
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    const load = async () => {
      const all = await fetchIncidents();
      const found = all.find((i) => String(i.id) === String(id));
      setIncident(found ?? null);
    };
    load();
  }, [id]);

  if (!incident) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading incident...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{incident.mainCategory}</Text>

      <Text style={styles.label}>Street:</Text>
      <Text style={styles.value}>{incident.mainStreet}</Text>

      {incident.crossStreet ? (
        <>
          <Text style={styles.label}>Cross Street:</Text>
          <Text style={styles.value}>{incident.crossStreet}</Text>
        </>
      ) : null}

      <Text style={styles.label}>Region:</Text>
      <Text style={styles.value}>{incident.region}</Text>

      <Text style={styles.label}>Created:</Text>
      <Text style={styles.value}>
        {new Date(incident.created).toLocaleString()}
      </Text>

      {incident.adviceA ? (
        <>
          <Text style={styles.label}>Advice:</Text>
          <Text style={styles.value}>{incident.adviceA}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  label: { fontWeight: "600", marginTop: 10 },
  value: { marginBottom: 10 },
});