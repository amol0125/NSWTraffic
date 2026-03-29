import { searchStreets } from "../../src/utils/streetSearch";

describe("searchStreets", () => {
  const streets = ["George St", "Pitt St", "Oxford St"];

  it("returns matches", () => {
    const result = searchStreets(streets, "ge");
    expect(result).toEqual(["George St"]);
  });

  it("is case insensitive", () => {
    const result = searchStreets(streets, "PITT");
    expect(result).toEqual(["Pitt St"]);
  });

  it("returns empty for empty query", () => {
    expect(searchStreets(streets, "")).toEqual([]);
  });
});
