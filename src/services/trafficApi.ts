import type { Incident } from "../types/Incident";

const API_KEY = process.env.EXPO_PUBLIC_NSW_API_KEY;

export async function fetchIncidents() {
  const res = await fetch(
    "https://api.transport.nsw.gov.au/v1/traffic/hazards",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: process.env.EXPO_PUBLIC_NSW_API_KEY!,
      },
    }
  );

  if (!res.ok) {
    console.log("NSW API error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();

  if (!data || !data.features) return [];

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
