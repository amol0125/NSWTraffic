import type { Incident } from "../types/Incident";

const API_URL = "https://nswtraffic-proxy.amhassani.workers.dev/";

export async function fetchIncidents(): Promise<Incident[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    console.log("Proxy error:", res.status, await res.text());
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
