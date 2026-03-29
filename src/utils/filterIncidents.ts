import type { Incident } from "../types/Incident";

export function filterIncidents(
  incidents: Incident[],
  region: string,
  type: string,
  street: string
) {
  let filtered = [...incidents];

  // LAST 3 MONTHS
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  filtered = filtered.filter(i => {
    const createdDate = new Date(i.created);
    return createdDate >= threeMonthsAgo && createdDate <= now;
  });

  if (region) {
    filtered = filtered.filter(i => i.region === region);
  }

  if (type) {
    filtered = filtered.filter(i => i.mainCategory === type);
  }

  if (street) {
    filtered = filtered.filter(i => i.mainStreet === street);
  }

  return filtered;
}
