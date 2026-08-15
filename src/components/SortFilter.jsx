const SortFilter = ({ sort, setSort }) => {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border rounded-lg px-4 py-2 bg-white"
    >
      <option value="">Sort By</option>

      <option value="priceLow">
        Price: Low → High
      </option>

      <option value="priceHigh">
        Price: High → Low
      </option>

      <option value="ratingHigh">
        Rating: High → Low
      </option>

      <option value="ratingLow">
        Rating: Low → High
      </option>

      <option value="nameAZ">
        Name: A → Z
      </option>

      <option value="nameZA">
        Name: Z → A
      </option>
    </select>
  );
};

export default SortFilter;