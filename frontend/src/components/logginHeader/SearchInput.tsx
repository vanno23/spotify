import React, { useEffect, useState } from "react";
import "./SearchInput.scss";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/search") {
      const pathname = location.pathname;
      const searchPath = pathname.replace(/^\/search\//, "");
      const segments = searchPath.split("/");
      if (segments.length > 1) {
        segments.pop(); // Remove the last segment
      }

      const searchQuery = segments.join("/");
      setInputValue(decodeURIComponent(searchQuery));
    }
    if (location.pathname === "/search/") {
      navigate("/search");
    }
  }, [inputValue.length, location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    navigate(`/search/${encodeURIComponent(value)}`);
  };

  const clearInput = () => {
    setInputValue("");
    navigate("/search");
  };

  return (
    <div className="searchPageInput">
      <i className="fa-solid fa-magnifying-glass searchIcon"></i>
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="What do you want to listen to?"
        type="text"
      />
      {inputValue.length > 0 && (
        <i onClick={clearInput} className="fa-solid fa-xmark closeIcon"></i>
      )}
    </div>
  );
};

export default SearchInput;
