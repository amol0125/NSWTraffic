import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import IncidentDetails from "../../app/incident/[id]";
import { fetchIncidents } from "../../src/services/trafficApi";


// Mock expo-router params
jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "123" }),
}));

// Mock fetchIncidents
jest.mock("../../src/services/trafficApi", () => ({
  fetchIncidents: jest.fn(),
}));

describe("IncidentDetails Screen", () => {
  it("shows loading state first", () => {
    (fetchIncidents as jest.Mock).mockResolvedValue([]);

    const { getByText } = render(<IncidentDetails />);
    expect(getByText("Loading incident...")).toBeTruthy();
  });

  it("renders incident details after loading", async () => {
    (fetchIncidents as jest.Mock).mockResolvedValue([
      {
        id: 123,
        mainCategory: "Accident",
        mainStreet: "George St",
        crossStreet: "Pitt St",
        region: "Sydney",
        created: new Date("2024-01-01T10:00:00Z").toISOString(),
        adviceA: "Avoid the area",
      },
    ]);

    const { getByText, queryByText } = render(<IncidentDetails />);

    // Loading should appear first
    expect(getByText("Loading incident...")).toBeTruthy();

    // Wait for data to load
    await waitFor(() => {
      expect(queryByText("Loading incident...")).toBeNull();
    });

    // Now check the details
    expect(getByText("Accident")).toBeTruthy();
    expect(getByText("George St")).toBeTruthy();
    expect(getByText("Pitt St")).toBeTruthy();
    expect(getByText("Sydney")).toBeTruthy();
    expect(getByText("Avoid the area")).toBeTruthy();
  });
});
