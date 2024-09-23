import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Define types for props if needed
interface SearchProps {
  label?: string;
  options?: string[];
  onSearch: (searchText: string, selectedOption: string) => void;
}

const Search: React.FC<SearchProps> = ({ options, label, onSearch }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    options ? options[0] : label ? label : "none"
  );
  const [searchText, setSearchText] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    if (options) {
      onSearch(searchText, selectedOption);
    }

    if (label) {
      onSearch(searchText, label);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid var(--grey)",
        background: "var(--grey)",
        width: "70%",
        justifyContent: "space-around",
        // margin: "10px auto"
        padding: "2px",
      }}
    >
      <div style={{ position: "relative", width: "20%" }}>
        {options ? (
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              padding: "8px",
              border: "none",
              background: "white",
              textAlign: "left",
              height: "38px", // Ensures the same height as the input field
              display: "flex", // Aligns content properly
              alignItems: "center",
              // marginLeft: "3px",
              color: "#666",
            }}
          >
            {selectedOption}
            <FontAwesomeIcon
              style={{
                color: "var(--grey)",
                paddingLeft: "4rem",
              }}
              icon={faCaretDown}
            />
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "white",
              // cursor: "pointer",
            }}
            // onClick={handleSearch}
          >
            {selectedOption}
          </div>
        )}

        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              // top: '100%',
              left: "0",
              border: "1px solid #ccc",
              backgroundColor: "white",
              zIndex: 1,
              width: "100%",
              maxHeight: "150px",
              overflowY: "auto",
              fontSize: "0.9rem",
            }}
          >
            {options?.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionChange(option)}
                style={{ padding: "0.5rem", cursor: "pointer" }}
              >
                {option}
              </div>
            ))}

            {label && <div>{label}</div>}
          </div>
        )}
      </div>
      <div style={{ width: "75%" }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search..."
          style={{
            padding: "8px",
            border: "none",
            width: "100%",
            height: "38px", // Ensures the same height as the dropdown
          }}
        />
      </div>

      <div
        style={{
          width: "15%",
          textAlign: "center",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleSearch}
      >
        검색
      </div>
    </div>
  );
};

export default Search;
