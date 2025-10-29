import { useState, useEffect, useCallback } from "react";
import SearchCatalog from "./searchCatalog";
import { findBySearch, formatRelease, catalogBooks } from "../../api/apiFunctions";
import {motion} from 'framer-motion';
import BooksTable from "./BooksTable";
import Filter from '../../filter/Filter';


const BooksCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
    const [filterData, setFilterData] = useState({
        sortBy: 'books',
        orderBy: 'ascending',
        from: null,
        to: null
    });
    
    //search useEffect
    useEffect(()=> {
        const fetchData = async () => {
            if (!query) {
                const result = await catalogBooks(filterData);
                console.log(result)
                setData(result);
                return;
            } 
            const result = await findBySearch(query);
            console.log(result);
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
            {data && <BooksTable books={data}/>}
             
        
        </motion.div>
    );
};

export default BooksCatalog;
