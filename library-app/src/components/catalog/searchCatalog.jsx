import { useState } from "react";
import {motion} from 'framer-motion';
import { NavLink, useSearchParams } from "react-router-dom";

const SearchCatalog = ({setQuery, setData}) => {
    const [text, setText] = useState('');
    const [searchParams] = useSearchParams();

    const selected = searchParams.get('selected');

    return (
        <div
          className="search-container">
            <input type="text" value={text} onChange={e => setText(e.target.value)}/>
            <NavLink to={text ? `/catalog?selected=${selected}&search_query=${text}` : `/catalog?selected=${selected}`}>
                <motion.button 
                className="search-button" 
                onClick={() => setQuery(text)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                >search</motion.button>
                </NavLink>
        </div>
    );
};

export default SearchCatalog;