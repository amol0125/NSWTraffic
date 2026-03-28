import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchIncidents } from "./(services)/trafficApi";

import { Button } from "react-native";


export default function Home() {
  const [rawIncidents, setRawIncidents] = useState([]);

  const [regions, setRegions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");

  const [allIncidents, setAllIncidents] = useState([]);
  


const handleSearch = () => {
  let filtered = allIncidents; // ALWAYS start from full list

  if (selectedRegion) {
    filtered = filtered.filter(i => i.region === selectedRegion);
  }

  if (selectedType) {
    filtered = filtered.filter(i => i.mainCategory === selectedType);
  }

  if (selectedStreet) {
    filtered = filtered.filter(i => i.mainStreet === selectedStreet);
  }

  setRawIncidents(filtered);
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
    <View style={styles.container}>
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

      {/* TYPE PICKER */}
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
      <Picker
        selectedValue={selectedStreet}
        onValueChange={setSelectedStreet}
        style={styles.picker}
      >
        <Picker.Item label="All Streets" value="" />
        {streets.map((s, index) => (
          <Picker.Item key={s || index} label={s} value={s} />
        ))}
      </Picker>

      {/* INCIDENT LIST */}
      <Button title="Search" onPress={handleSearch} />
      

      <FlatList
        data={rawIncidents}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.mainCategory}</Text>
            <Text>{item.mainStreet}</Text>
            <Text>{item.region}</Text>
            <Text>{new Date(item.created).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
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
});
