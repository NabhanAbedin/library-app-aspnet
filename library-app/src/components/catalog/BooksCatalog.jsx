import { useState, useEffect, useCallback } from "react";
import SearchCatalog from "./searchCatalog";
import { findBySearch, formatRelease, catalogBooks } from "../../api/apiFunctions";
import { getBooks } from "../../api/catalogApi";
import {motion} from 'framer-motion';
import BooksTable from "./BooksTable";
import Filter from '../../filter/Filter';


const BooksCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
    const [filterData, setFilterData] = useState({
        sortBy: 'books',
        orderBy: 'asc',
        from: null,
        to: null
    });
    
    //search useEffect
    useEffect(()=> {
        const fetchData = async () => {
            const result = await getBooks({
                search: query,
                sortBy: filterData.sortBy,
                orderBy: filterData.orderBy,
                from: filterData.from,
                to: filterData.to
            });
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
