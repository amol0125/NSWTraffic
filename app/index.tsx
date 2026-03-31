import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { fetchIncidents } from "../src/services/trafficApi";
import type { Incident } from "../src/types/Incident";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  prerender: false,
};


export default function Home() {

  const [regions, setRegions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");

  const [filteredStreets, setFilteredStreets] = useState<string[]>([]);
  const [allIncidents, setAllIncidents] = useState<Incident[]>([]);
  const [rawIncidents, setRawIncidents] = useState<Incident[]>([]);





  const handleSearch = () => {
    let filtered = allIncidents;

    // LAST 3 MONTHS FILTER
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    filtered = filtered.filter(i => {
      const createdDate = new Date(i.created);
      return createdDate >= threeMonthsAgo && createdDate <= now;
    });

    // REGION FILTER
    if (selectedRegion) {
      filtered = filtered.filter(i => i.region === selectedRegion);
    }

    // TYPE FILTER
    if (selectedType) {
      filtered = filtered.filter(i => i.mainCategory === selectedType);
    }

    // STREET FILTER
    if (selectedStreet) {
      filtered = filtered.filter(i => i.mainStreet === selectedStreet);
    }

    // SHOW MESSAGE IF NO RESULTS
    if (filtered.length === 0) {
      Alert.alert(
        "No Incidents Found",
        "No incidents were found in the last 3 months for your selected filters."
      );
      return;
    }

    // NAVIGATE TO RESULTS PAGE
    router.push({
      pathname: "/results",
      params: { data: JSON.stringify(filtered) },
    });

  };


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const list = await fetchIncidents();

    setAllIncidents(list);
    setRawIncidents(list);

    // Extract regions from FULL list
    const regionSet = new Set(
      list.map(i => i.region).filter(r => r && r.trim() !== "")
    );
    setRegions([...regionSet]);

    // Extract types from FULL list
    const typeSet = new Set(
      list.map(i => i.mainCategory).filter(t => t && t.trim() !== "")
    );
    setTypes([...typeSet]);

    // Extract streets from FULL list
    const streetSet = new Set(
      list.map(i => i.mainStreet).filter(s => s && s.trim() !== "")
    );
    setStreets([...streetSet]);
  };


  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>NSW Traffic Incidents</Text>

      {/* REGION PICKER */}
      <Text style={styles.label}>Region</Text>
      <Picker
        selectedValue={selectedRegion}
        onValueChange={setSelectedRegion}
        style={styles.picker}
      >
        <Picker.Item label="All Regions" value="" />
        {regions.map((r, index) => (
          <Picker.Item key={r || index} label={r} value={r} />
        ))}
      </Picker>

      {/* TYPE STREET */}
      <Text style={styles.label}>Incident Type</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={setSelectedType}
        style={styles.picker}
      >
        <Picker.Item label="All Types" value="" />
        {types.map((t, index) => (
          <Picker.Item key={t || index} label={t} value={t} />
        ))}
      </Picker>

      {/* STREET PICKER */}
      <Text style={styles.label}>Street</Text>
      <TextInput
        placeholder="Enter street name"
        value={selectedStreet}
        onChangeText={(text) => {
          setSelectedStreet(text);

          if (text.length > 0) {
            const matches = streets.filter((s) =>
              s.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredStreets(matches);
          } else {
            setFilteredStreets([]);
          }
        }}
        style={styles.input}
      />

      {filteredStreets.length > 0 && (
        <View style={styles.suggestionBox}>
          {filteredStreets.map((s, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelectedStreet(s);
                setFilteredStreets([]);
              }}
              style={styles.suggestionItem}
            >
              <Text>{s}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* INCIDENT LIST */}
      <Pressable
        onPress={() => router.push("/saved")}
        style={styles.savedButton}
      >
        <Text style={styles.savedButtonText}>Saved Incidents</Text>
      </Pressable>

      <Button title="Search" onPress={handleSearch} />
      


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  label: { marginTop: 10, fontWeight: "600" },
  picker: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 6,
  },
  cardTitle: { fontWeight: "bold" },

  savedButton: {
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: "#34C759",
    borderRadius: 6,
    alignItems: "center",
  },
  savedButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  suggestionBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "white",
    maxHeight: 150,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

});
