const PriceFilter = ({ maxPrice, setMaxPrice }) => {
  return (
    <div className="mb-7">

      <h3 className="font-semibold mb-3">
        Price
      </h3>

      <input
        type="range"
        min="0"
        max="1500"
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(Number(e.target.value))
        }
        className="w-full accent-teal-500"
      />

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>₹0</span>
        <span>₹{maxPrice}</span>
      </div>

    </div>
  );
};

export default PriceFilter;