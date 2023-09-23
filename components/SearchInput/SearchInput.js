import {
  SearchInputStyled,
  FilterSelect,
  SearchComponent,
} from "./SearchInput.styled";

export default function SearchInput({
  onSearchChange,
  onFilterChange,
  filterValue,
}) {
  return (
    <SearchComponent>
      <SearchInputStyled
        type="search"
        placeholder="Search a nurse"
        onChange={(event) => onSearchChange(event.target.value.toLowerCase())}
      ></SearchInputStyled>
      <FilterSelect
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="nurse">Nurse</option>
        <option value="chief">Chief</option>
        <option value="sub-chief">Sub-chief</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </FilterSelect>
    </SearchComponent>
  );
}
