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
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              </select>
        </>
    );
};

export default Direction;