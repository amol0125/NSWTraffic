import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "saved_incidents";

// Save a single incident
export const saveIncident = async (incident: any) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    let saved = existing ? JSON.parse(existing) : [];

    // Avoid duplicates
    const alreadySaved = saved.some((i: any) => i.id === incident.id);
    if (!alreadySaved) {
      saved.push(incident);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.log("Error saving incident:", error);
  }
};

// Get all saved incidents
export const getSavedIncidents = async () => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.log("Error loading saved incidents:", error);
    return [];
  }
};

// Remove a single incident
export const removeIncident = async (id: string | number) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    let saved = existing ? JSON.parse(existing) : [];

    saved = saved.filter((i: any) => i.id !== id);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch (error) {
    console.log("Error removing incident:", error);
  }
};

// Clear all saved incidents
export const clearAllIncidents = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log("Error clearing incidents:", error);
  }
};
