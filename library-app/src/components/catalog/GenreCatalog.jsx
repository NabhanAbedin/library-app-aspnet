import { useState, useEffect,  } from "react";
import SearchCatalog from "./searchCatalog";
import {motion} from 'framer-motion';
import { catalogGenre, findGenreBySearch } from "../../api/apiFunctions.js";
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
            if (!query) {
                const result = await catalogGenre(filterData);
                setData(result);
                return;
            }  
            const result = await findGenreBySearch(query);
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
