const Direction = ({filterData, setFilterData}) => {
    return (
        <>
        <p>order by</p>
              <select 
              id='order-select'
              value={filterData.orderBy}
              onChange={(e) =>
                  setFilterData(prev => ({
                    ...prev,
                    orderBy: e.target.value
                  }))
                }
              >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
              </select>
        </>
    );
};

export default Direction;