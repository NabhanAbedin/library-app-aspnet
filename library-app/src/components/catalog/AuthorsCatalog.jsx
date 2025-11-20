import { useState, useEffect,  } from "react";
import SearchCatalog from "./searchCatalog";
import { getAuthors } from "../../api/catalogApi";
import {motion} from 'framer-motion';
import Filter from "../../filter/Filter";
import AuthorsTable from "./AuthorsTable";

const AuthorsCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
    const [filterData, setFilterData] = useState({
        orderBy: 'asc',
        from: null,
        to: null
    });
 
    useEffect(()=> {
        const fetchData = async () => {
            
            const result = await getAuthors({
                search: query,
                orderBy: filterData.orderBy,
                from: filterData.from,
                to: filterData.to
            })
            setData(result);
        };
     fetchData();
    },[query,filterData])

        
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
            {data && <AuthorsTable authors={data}/>}
             
        
        </motion.div>
    );
};

export default AuthorsCatalog;
