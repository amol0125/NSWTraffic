import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../../app/index";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock("../../src/services/trafficApi", () => ({
  fetchIncidents: jest.fn().mockResolvedValue([
    {
      id: 1,
      region: "Sydney",
      mainCategory: "Accident",
      mainStreet: "George St",
      created: new Date().toISOString(),
    },
  ]),
}));

describe("Home navigation", () => {
  it("navigates to /results when Search is pressed", async () => {
    const { getByText, findByText } = render(<Home />);

    // Wait for title to appear (means component loaded)
    await findByText("NSW Traffic Incidents");

    fireEvent.press(getByText("Search"));

    const { router } = require("expo-router");

    expect(router.push).toHaveBeenCalled();
    expect(router.push.mock.calls[0][0].pathname).toBe("/results");
  });
});
