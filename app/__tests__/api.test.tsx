import { fetchIncidents } from "../../src/services/trafficApi";

// Mock global fetch
global.fetch = jest.fn();

describe("fetchIncidents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns mapped incidents when API responds correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          features: [
            {
              id: 123,
              properties: {
                headline: "Accident on highway",
                mainCategory: "Accident",
                created: 111111,
                adviceA: "Avoid area",
                roads: [
                  {
                    region: "Sydney",
                    mainStreet: "George St",
                    crossStreet: "Pitt St",
                  },
                ],
              },
            },
          ],
        }),
    });

    const result = await fetchIncidents();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      id: 123,
      headline: "Accident on highway",
      mainCategory: "Accident",
      region: "Sydney",
      mainStreet: "George St",
      crossStreet: "Pitt St",
      created: 111111,
      adviceA: "Avoid area",
    });
  });

  it("returns empty array when API returns no features", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    const result = await fetchIncidents();
    expect(result).toEqual([]);
  });

  it("calls the Vercel proxy instead of NSW API", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ features: [] }),
    });

    await fetchIncidents();

    expect(fetch).toHaveBeenCalledWith(
      "https://nsw-traffic.vercel.app"
    );

  });
});
