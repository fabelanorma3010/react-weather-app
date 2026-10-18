export function convertTemperature(celsius, unit) {
  const temperature =
    unit === "fahrenheit" ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(temperature);
}
