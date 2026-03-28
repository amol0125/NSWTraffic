import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "MY_INCIDENTS";

export const loadSaved = async () => {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
};

export const saveIncident = async (incident: any) => {
  const saved = await loadSaved();
  const updated = [...saved, incident];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};
