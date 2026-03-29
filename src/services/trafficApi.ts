import Constants from "expo-constants";
import type { Incident } from "../types/Incident";

export async function fetchIncidents(): Promise<Incident[]> {
  const API_KEY = (Constants.expoConfig as any).extra.EXPO_PUBLIC_API_KEY;

  const res = await fetch(
    "https://api.transport.nsw.gov.au/v1/live/hazards/incident/all",
    {
      headers: {
        Accept: "application/json",
        Authorization: API_KEY,
      },
    },
  );

  const data = await res.json();

  // Safety check
  if (!data || !data.features) {
    console.log("Unexpected API response:", data);
    return [];
  }

  // Convert NSW API → clean incident objects
  return data.features.map((f: any) => {
    const p = f.properties;
    const r = p.roads?.[0] ?? {};

    return {
      id: f.id,
      headline: p.headline ?? "",
      mainCategory: p.mainCategory ?? "",
      region: r.region ?? "",
      mainStreet: r.mainStreet ?? "",
      crossStreet: r.crossStreet ?? "",
      created: p.created,
      adviceA: p.adviceA ?? "",
    };
  });
}
