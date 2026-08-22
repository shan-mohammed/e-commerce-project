const SortFilter = ({ filters, setFilters }) => {

  const handleSortChange= (e)=>{
    setFilters((prev)=>({
      ...prev,
      sort :e.target.value,
    }))
  }
 return(
  <div className="flex items-center gap-3">
   <label htmlFor="sort"
   className="font-medium text-gray-700">
    Sort by:
   </label>
   <select id="sort"
   value={filters.sort}
   onChange={handleSortChange}
   className="border border-gray-300 rounded-lg px-4 py-2
   bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 ">
       
       <option value="">Default</option>
            <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price :High to Low</option>
                   
                    <option value="ratingHigh">Rating:High to Low</option>
                        <option value="ratingLow">Rating:Low to</option>
                           
                            <option value="nameAZ">Name: A to Z</option>
                                <option value="nameZA">Name:Z to A</option>

      </select>
  </div>
 )
};

export default SortFilter;