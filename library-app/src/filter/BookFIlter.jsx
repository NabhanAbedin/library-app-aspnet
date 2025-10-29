import SortBy from './SortBy.jsx';
import SortByAlpha from './SortByAlpha.jsx';
import SortByYear from './SortByYear.jsx';
import Direction from './Direction.jsx';

const BookFilter = ({filterData, setFilterData, inputFrom, setInputFrom, inputTo, setInputTo}) => {

    return (
        <>
          <div className='filter-section'>
              <p>sort by</p>
              <SortBy filterData={filterData} setFilterData={setFilterData} />
          </div>
          <div className='filter-section'>
              <Direction filterData={filterData} setFilterData={setFilterData} />
          </div>
          <div className='filter-section'>
              {filterData.sortBy === 'books' ? (<SortByYear inputFrom={inputFrom} setInputFrom={setInputFrom}
              inputTo={inputTo} setInputTo={setInputTo}
              setFilterData={setFilterData}/>)
                : filterData.sortBy === 'authors' ? (<SortByAlpha inputFrom={inputFrom} setInputFrom={setInputFrom}
                inputTo={inputTo} setInputTo={setInputTo}
                setFilterData={setFilterData}/>) : null}
              
          </div>
        </>
    );
};

export default BookFilter;