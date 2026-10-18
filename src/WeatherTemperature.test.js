import { fireEvent, render, screen } from "@testing-library/react";
import WeatherTemperature from "./WeatherTemperature";
import { convertTemperature } from "./temperature";

test("converts Celsius temperatures to Fahrenheit and rounds the result", () => {
  expect(convertTemperature(0, "fahrenheit")).toBe(32);
  expect(convertTemperature(20, "fahrenheit")).toBe(68);
  expect(convertTemperature(21.4, "fahrenheit")).toBe(71);
});

test("shows the selected unit and lets the user switch units", () => {
  const onUnitChange = jest.fn();
  const { rerender } = render(
    <WeatherTemperature
      celsius={20}
      unit="celsius"
      onUnitChange={onUnitChange}
    />
  );

  expect(screen.getByText("20")).toBeInTheDocument();
  expect(screen.getAllByText("°C")).toHaveLength(2);

  fireEvent.click(screen.getByRole("button", { name: "°F" }));
  expect(onUnitChange).toHaveBeenCalledWith("fahrenheit");

  rerender(
    <WeatherTemperature
      celsius={20}
      unit="fahrenheit"
      onUnitChange={onUnitChange}
    />
  );
  expect(screen.getByText("68")).toBeInTheDocument();
  expect(screen.getAllByText("°F")).toHaveLength(2);
});
