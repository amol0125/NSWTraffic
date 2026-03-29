import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { clearAllIncidents, getSavedIncidents, removeIncident } from "../src/storage/savedIncidents";

import type { Incident } from "../src/types/Incident";
import { SafeAreaView } from "react-native-safe-area-context";




export default function SavedIncidents() {
  const [saved, setSaved] = useState<Incident[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getSavedIncidents() as Incident[];
    setSaved(data);
  };

  const handleDelete = async (id: number | string) => {
    await removeIncident(id);
    load();
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All",
      "Are you sure you want to remove all saved incidents?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearAllIncidents();
            load();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>My Saved Incidents</Text>

      <FlatList
        data={saved}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }: { item: Incident }) => (
          <View style={styles.card}>
            <Text style={styles.category}>{item.mainCategory}</Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Street:</Text>
              <Text style={styles.value}>{item.mainStreet}</Text>
            </View>

            {item.crossStreet ? (
              <View style={styles.row}>
                <Text style={styles.label}>Cross:</Text>
                <Text style={styles.value}>{item.crossStreet}</Text>
              </View>
            ) : null}

            <View style={styles.row}>
              <Text style={styles.label}>Region:</Text>
              <Text style={styles.value}>{item.region}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Created:</Text>
              <Text style={styles.value}>
                {new Date(item.created).toLocaleString()}
              </Text>
            </View>

            {item.adviceA ? (
              <View style={styles.row}>
                <Text style={styles.label}>Advice:</Text>
                <Text style={styles.value}>{item.adviceA}</Text>
              </View>
            ) : null}

            {/* DELETE BUTTON */}
            <Pressable
              onPress={() => handleDelete(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />

      {/* CLEAR ALL BUTTON */}
      {saved.length > 0 && (
        <Pressable onPress={handleClearAll} style={styles.clearAllButton}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  card: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },

  category: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 12,
  },

  divider: {
    height: 1.2,
    backgroundColor: "#ccc",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
  },

  label: {
    fontWeight: "600",
    width: 90,
    color: "#555",
  },

  value: {
    flex: 1,
    color: "#222",
  },

  deleteButton: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "600",
  },

  clearAllButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },

  clearAllText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
