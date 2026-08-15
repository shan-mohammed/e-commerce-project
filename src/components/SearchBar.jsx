import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ search, setSearch }) => {
  const navigate =useNavigate();

  const handleSearch =(e)=>{
   if(e.key==="Enter"){
    if(search.trim() !==""){
      navigate ("/products")
    }
   }
  }
    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">

        {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-black-400 hover:text-teal-500"
      >
        <FaSearch />
      </button>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Search products.........."
        className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3
        focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

    </div>
  );
};

export default SearchBar;