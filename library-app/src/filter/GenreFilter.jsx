import Direction from './Direction';
import SortByAlpha from './SortByAlpha';


const GenreFilter = ({filterData, setFilterData, inputFrom, setInputFrom, inputTo, setInputTo}) => {
    return (
        <>
            <div className='filter-section'>
                <Direction filterData={filterData} setFilterData={setFilterData} />
            </div>
        </>
    );
};

export default GenreFilter;