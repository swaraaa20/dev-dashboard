import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search a GitHub username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="GitHub username"
      />
      <button type="submit">Search</button>
    </form>
  );
}