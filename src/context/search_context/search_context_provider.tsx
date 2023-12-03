import { useState } from "react";
import { SearchContext } from "./search_context";

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
