import React from "react";

export default function FormattedDate({ date }) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString(undefined, { weekday: "long" })}{" "}
      {date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </time>
  );
}
