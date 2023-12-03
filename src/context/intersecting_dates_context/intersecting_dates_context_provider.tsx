import { useState } from "react";
import { IntersectingDatesContext } from "./intersecting_dates_context";
import { DateTime } from "luxon";

export default function IntersectingDatesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [intersectingDates, setIntersectingDates] = useState<DateTime[]>([]);

  return (
    <IntersectingDatesContext.Provider
      value={{ intersectingDates, setIntersectingDates }}
    >
      {children}
    </IntersectingDatesContext.Provider>
  );
}
