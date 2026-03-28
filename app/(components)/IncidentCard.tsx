import { View, Text } from "react-native";

export default function IncidentCard({ item }) {
  // Support both old and new API formats
  const props =
    item.features?.properties
      ? item.features.properties
      : item;

  const headline = props.headline || props.displayName || "No headline";
  const category = props.mainCategory || "Unknown";
  const created = props.created ? new Date(props.created).toLocaleString() : "No date";

  return (
    <View style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}>
      <Text>{headline}</Text>
      <Text>{category}</Text>
      <Text>{created}</Text>
    </View>
  );
}

