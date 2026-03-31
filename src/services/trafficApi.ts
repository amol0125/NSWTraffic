import type { Incident } from "../types/Incident";

export async function fetchIncidents(): Promise<Incident[]> {
  const res = await fetch("https://nsw-traffic.vercel.app/api/incidents");

  if (!res.ok) {
    console.log("Proxy error:", res.status, await res.text());
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
