import { useParams } from "react-router-dom";
const SearchNoResult = () => {
  const { search_input } = useParams();
  return (
    <div
      style={{
        color: "white",
        marginTop: "15%",
        marginBottom: "5%",
        textAlign: "center",
      }}
    >
      <h2>No results found for "{search_input}"</h2>
      <p style={{ padding: "10px 0 30px", fontSize: "0.875rem" }}>
        Please make sure your words are spelled correctly, or use fewer or
        different keywords.
      </p>
    </div>
  );
};

export default SearchNoResult;
