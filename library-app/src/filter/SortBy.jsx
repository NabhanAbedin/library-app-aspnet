const SortBy = ({filterData, setFilterData }) => {
    return (
      <form>
        {['books', 'authors', 'genre'].map(option => (
          <label key={option}>
            <input
              type="radio"
              name="category"
              value={option}
              checked={filterData.sortBy === option}
              onChange={(e) =>
                setFilterData(prev => ({
                  ...prev,
                  sortBy: e.target.value
                }))
              }
            />
            {option}
          </label>
        ))}
      </form>
    );
  };

export default SortBy;