import { SearchInputStyled } from "./SearchInput.styled";

export default function SearchInput({ onSearchChange }) {
  return (
    <>
      <SearchInputStyled
        type="search"
        placeholder="Search a nurse"
        onChange={(e) => onSearchChange(e.target.value.toLowerCase())} //Callback on input change with toLowerCase function to convert the value
      />
      <br />
    </>
  );
}
