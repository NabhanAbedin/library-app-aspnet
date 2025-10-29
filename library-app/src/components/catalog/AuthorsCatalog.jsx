import { useState, useEffect,  } from "react";
import SearchCatalog from "./searchCatalog";
import {  catalogAuthors, findAuthorsBySearch  } from "../../api/apiFunctions";
import {motion} from 'framer-motion';
import Filter from "../../filter/Filter";
import AuthorsTable from "./AuthorsTable";

const AuthorsCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
    const [filterData, setFilterData] = useState({
        orderBy: 'ascending',
        from: null,
        to: null
    });
 
    useEffect(()=> {
        const fetchData = async () => {
            if (!query) {
                const result = await catalogAuthors(filterData);
                console.log(result)
                setData(result);
                return;
            }  
            const result = await findAuthorsBySearch(query);
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
