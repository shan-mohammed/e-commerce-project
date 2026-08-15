const BrandFilter = ({
  brands,
  selectedBrands,
  handleBrandChange,
}) => {
  return (
    <div className="mb-7">

      <h3 className="font-semibold mb-3">
        Brand
      </h3>

      <div className="max-h-48 overflow-y-auto space-y-2">

        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 cursor-pointer"
          >

            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() =>
                handleBrandChange(brand)
              }
              className="accent-teal-500"
            />

            <span className="text-sm">
              {brand}
            </span>

          </label>
        ))}

      </div>

    </div>
  );
};

export default BrandFilter;