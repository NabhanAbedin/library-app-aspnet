import { useState, useEffect,  } from "react";
import SearchCatalog from "./searchCatalog";
import {motion} from 'framer-motion';
import { getGenres } from "../../api/catalogApi";
import Filter from "../../filter/Filter";
import GenreTable from "./GenreTable";

const GenreCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
    const [filterData, setFilterData] = useState({
        orderBy: 'ascending',
    });
 
    useEffect(()=> {
        const fetchData = async () => {
           
            const result = await getGenres({
                search: query,
                orderBy: filterData.orderBy
            })
            setData(result);
        };
     fetchData();
    },[query, filterData])

    return (
        <motion.div 
        className="books-catalog-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        >
             <div className="catalog-controls">
                <SearchCatalog setQuery={setQuery} setData={setData}/>
                <Filter filterData={filterData} setFilterData={setFilterData}/>
            </div>
            {data && <GenreTable genre={data}/>}
             
        
        </motion.div>
    );
};

export default GenreCatalog;
