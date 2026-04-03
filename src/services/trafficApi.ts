import type { Incident } from "../types/Incident";

const API_URL =
  "https://api.transport.nsw.gov.au/v1/live/hazards/incident/all";

const API_KEY = process.env.EXPO_PUBLIC_NSW_API_KEY;

export async function fetchIncidents(): Promise<Incident[]> {
  if (!API_KEY) {
    console.log("NSW API error: missing EXPO_PUBLIC_NSW_API_KEY");
    return [];
  }

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY, // e.g. "apikey eyJhbGciOiJIUzI1NiIs..."
    },
  });

  if (!res.ok) {
    console.log("NSW API error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();

  if (!data || !data.features || !Array.isArray(data.features)) {
    return [];
  }

  return data.features.map((f: any): Incident => {
    const p = f.properties ?? {};
    const r = (p.roads && p.roads[0]) ?? {};

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
