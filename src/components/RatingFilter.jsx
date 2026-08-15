const RatingFilter = ({ rating, setRating }) => {
  return (
    <div className="mb-7">

      <h3 className="font-semibold mb-3">
        Rating
      </h3>

      {[4, 3, 2, 1].map((value) => (
        <label
          key={value}
          className="flex items-center gap-2 mb-2 cursor-pointer"
        >

          <input
            type="radio"
            name="rating"
            checked={rating === value}
            onChange={() => setRating(value)}
            className="accent-teal-500"
          />

          <span className="text-yellow-500">
            {"★".repeat(value)}
          </span>

          <span className="text-sm text-gray-500">
            & above
          </span>

        </label>
      ))}

    </div>
  );
};

export default RatingFilter;