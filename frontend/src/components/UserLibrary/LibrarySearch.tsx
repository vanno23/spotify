import React, { useEffect, useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./LibrarySearch.scss";
interface librarySearchProps {
  librarySearchValue: string;
  setLibrarySearchValue: React.Dispatch<React.SetStateAction<string>>;
  showHideNavbar: boolean;
}

const LibrarySearch = ({
  librarySearchValue,
  setLibrarySearchValue,
  showHideNavbar,
}: librarySearchProps) => {
  const [activeSearchButton, setActiveSearchButton] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (
        !target.closest(".librarySearchInput") &&
        librarySearchValue.length === 0 &&
        !target.closest(".LibrarySearchButton") &&
        !target.closest(".deleteSearchValue")
      ) {
        setActiveSearchButton(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [librarySearchValue.length]);

  const handleSearchClick = () => {
    setActiveSearchButton(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCloseClick = () => {
    setLibrarySearchValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`LibrarySearchHeader ${
        activeSearchButton ? "activeSearch" : ""
      } ${!showHideNavbar ? "LibrarySearchHeaderHide" : ""}`}
    >
      <input
        className="librarySearchInput"
        ref={inputRef}
        type="text"
        placeholder="Search in Your Library"
        value={librarySearchValue}
        onChange={(e) => setLibrarySearchValue(e.target.value)}
      />

      <button
        aria-label="LibrarySearchButton"
        className={`LibrarySearchButton`}
        onClick={handleSearchClick}
      >
        <SearchOutlinedIcon />
      </button>
      <button
        aria-label="deleteSearchButton"
        className={`deleteSearchValue ${
          librarySearchValue.length > 0 ? "activeDeleteSearchValue" : ""
        }`}
        onClick={handleCloseClick}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default LibrarySearch;
