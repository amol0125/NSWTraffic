export function searchStreets(streets: string[], query: string) {
  if (!query) return [];
  return streets.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );
}
