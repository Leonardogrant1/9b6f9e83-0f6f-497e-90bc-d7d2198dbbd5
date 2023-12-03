import { createContext } from "react";

type SearchContextValue = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchContext = createContext<SearchContextValue>({
  search: "",
  setSearch: () => {},
});
