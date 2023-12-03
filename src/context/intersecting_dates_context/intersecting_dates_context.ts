import { createContext } from "react";
import { DateTime } from "luxon";

export type IntersectingDatesState = {
  intersectingDates: DateTime[];
  setIntersectingDates: (intersectingDates: DateTime[]) => void;
};

export const IntersectingDatesContext = createContext<IntersectingDatesState>({
  intersectingDates: [],
  setIntersectingDates: () => {},
});
