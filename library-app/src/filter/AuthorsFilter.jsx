import Direction from './Direction';
import SortByAlpha from './SortByAlpha';


const AuthorsFilter = ({filterData, setFilterData, inputFrom, setInputFrom, inputTo, setInputTo}) => {
    return (
        <>
            <div className='filter-section'>
                <Direction filterData={filterData} setFilterData={setFilterData} />
            </div>
            <div className='filter-section'>
            <SortByAlpha inputFrom={inputFrom} setInputFrom={setInputFrom}
                inputTo={inputTo} setInputTo={setInputTo}
                setFilterData={setFilterData}/>

            </div>


        </>
    );
};

export default AuthorsFilter;