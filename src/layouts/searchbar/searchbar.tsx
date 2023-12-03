import { useContext } from "react";
import "./searchbar.scss";
import { SearchContext } from "@src/context/search_context/search_context";

export default function Searchbar() {
  const { setSearch } = useContext(SearchContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("oaiwdfjwdwd");
    setSearch(e.target.value);
  };

  return (
    <>
      <input id="search_bar" placeholder="Search" onChange={handleChange} />
    </>
  );
}
