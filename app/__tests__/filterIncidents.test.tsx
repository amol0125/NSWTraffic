import { filterIncidents } from "../../src/utils/filterIncidents";

const baseDate = new Date();
const oldDate = new Date();
oldDate.setMonth(baseDate.getMonth() - 5); // older than 3 months

const incidents = [
  {
    id: 1,
    region: "Sydney",
    mainCategory: "Accident",
    mainStreet: "George St",
    created: baseDate.toISOString(),
    headline: "",
    adviceA: "",
  },
  {
    id: 2,
    region: "North",
    mainCategory: "Hazard",
    mainStreet: "Pacific Hwy",
    created: baseDate.toISOString(),
    headline: "",
    adviceA: "",
  },
  {
    id: 3,
    region: "Sydney",
    mainCategory: "Accident",
    mainStreet: "Pitt St",
    created: oldDate.toISOString(),
    headline: "",
    adviceA: "",
  },
];


describe("filterIncidents", () => {
  it("filters by last 3 months", () => {
    const result = filterIncidents(incidents, "", "", "");
    expect(result.length).toBe(2);
  });

  it("filters by region", () => {
    const result = filterIncidents(incidents, "Sydney", "", "");
    expect(result.length).toBe(1);
  });

  it("filters by type", () => {
    const result = filterIncidents(incidents, "", "Hazard", "");
    expect(result.length).toBe(1);
  });

  it("filters by street", () => {
    const result = filterIncidents(incidents, "", "", "George St");
    expect(result.length).toBe(1);
  });
});
