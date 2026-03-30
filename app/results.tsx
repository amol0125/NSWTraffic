
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { getSavedIncidents, saveIncident } from "../src/storage/savedIncidents";

import type { Incident } from "../src/types/Incident";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  prerender: false,
};


export default function ResultsPage() {
  const { data } = useLocalSearchParams();
  const incidents: Incident[] = JSON.parse(data as string);

  const [savedList, setSavedList] = useState<Incident[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
        const saved = await getSavedIncidents();
        setSavedList(saved);
    };
    loadSaved();
  }, []);

  const isSaved = (id: number | string) => {
    return savedList.some((i) => i.id === id);
  };



  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Filtered Results</Text>

      <FlatList
        data={incidents}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
        <Link
            href={{
            pathname: "/incident/[id]",
            params: { id: item.id },
            }}
            asChild
        >
            <View style={styles.card}>
            <Text style={styles.category}>{item.mainCategory}</Text>

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.label}>Street:</Text>
                <Text style={styles.value}>{item.mainStreet}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Cross:</Text>
                <Text style={styles.value}>{item.crossStreet}</Text>
            </View>

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

            {isSaved(item.id) ? (
                <View style={styles.savedBadge}>
                    <Text style={styles.savedBadgeText}>Saved</Text>
                </View>
            ) : (
                <Pressable
                    onPress={async () => {
                    await saveIncident(item);
                    const updated = await getSavedIncidents();
                    setSavedList(updated);
                    Alert.alert("Saved", "Incident has been added to My Incidents.");
                    }}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
            )}



            </View>
        </Link>
        )}



      />
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
    marginBottom: 12,   // ← clean separation
    },

    divider: {
    height: 1.2,
    backgroundColor: "#ccc",
    marginBottom: 12,   // ← clean separation
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

    saveButton: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 6,
    alignItems: "center",
    },

    saveButtonText: {
    color: "white",
    fontWeight: "600",
    },

    savedBadge: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: "#34C759",
    borderRadius: 6,
    alignItems: "center",
    },

    savedBadgeText: {
    color: "white",
    fontWeight: "600",
    },

});
