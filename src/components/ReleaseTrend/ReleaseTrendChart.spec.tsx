import { screen, render } from "@testing-library/react";
import ReleaseTrendChart from "./ReleaseTrendChart";
import "@testing-library/jest-dom";
import { Manufacturer } from "../../types";

const mockData = {
  [Manufacturer.All]: [
    { year: "2020", releases: 80 },
    { year: "2021", releases: 100 },
  ],
  [Manufacturer.Sony]: [
    { year: "2020", releases: 30 },
    { year: "2021", releases: 80 },
  ],
  [Manufacturer.Nintendo]: [],
  [Manufacturer.Microsoft]: [],
  [Manufacturer.Sega]: [],
  [Manufacturer.PC]: [],
  [Manufacturer.Other]: [],
};

describe("ReleaseTrendChart", () => {
  test("renders svg elements for all manufacturers", () => {
    render(
      <ReleaseTrendChart
        data={mockData}
        width={500}
        height={500}
        manufacturer={Manufacturer.All}
      />
    );

    const expectedTestIds = ["bar-all-2020", "bar-all-2021"];
    const notExpectedTestIds = ["bar-sony-2020", "bar-sony-2021"];

    expectedTestIds.forEach((testId) => {
      screen.getAllByTestId(testId);
    });

    notExpectedTestIds.forEach((testId) => {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
  });

  test("renders svg elements for all manufacturers and sony", () => {
    render(
      <ReleaseTrendChart
        data={mockData}
        width={500}
        height={500}
        manufacturer={Manufacturer.Sony}
      />
    );

    const expectedTestIds = [
      "bar-all-2020",
      "bar-all-2021",
      `bar-${Manufacturer.Sony}-2020`,
      `bar-${Manufacturer.Sony}-2021`,
    ];

    expectedTestIds.forEach((testId) => {
      screen.getAllByTestId(testId);
    });
  });
});
