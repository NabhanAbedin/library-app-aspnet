import squaresImg from '../images/squares.png';
import { useState, useEffect } from 'react';
import {AnimatePresence} from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import BookFilter from './BookFIlter';
import AuthorsFilter from './AuthorsFilter';
import GenreFilter from './GenreFilter';
import {motion} from 'framer-motion';



const Filter = ({filterData, setFilterData}) => {
    const [active, setActive] = useState(false);
    const [inputFrom , setInputFrom] = useState('');
    const [inputTo , setInputTo] = useState('');
    const [searchParams] = useSearchParams();
    
    const selected = searchParams.get('selected');

    useEffect(()=> {
        if (filterData.to || filterData.from) {
            filterData.to = null;
            filterData.from = null;
            setInputFrom('');
            setInputTo('');
        }
    },[filterData.sortBy]);
    
    return (
        <div className="filter-wrapper">
          <button className="filter-button" onClick={()=> setActive(!active)}><img src={squaresImg} alt="" /></button>
          <AnimatePresence>
          {active && (
            <motion.div
            className="filter-inputs-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit ={{opacity: 0}}
            transition={{ duration: 0.15, ease: 'easeInOut' }}>
                { selected === 'books' ? <BookFilter filterData={filterData} setFilterData={setFilterData} inputFrom={inputFrom} setInputFrom={setInputFrom} inputTo={inputTo} setInputTo={setInputTo} /> : selected === 'authors' ? <AuthorsFilter filterData={filterData} setFilterData={setFilterData} inputFrom={inputFrom} setInputFrom={setInputFrom} inputTo={inputTo} setInputTo={setInputTo} /> : selected === 'genres' ? <GenreFilter filterData={filterData} setFilterData={setFilterData} inputFrom={inputFrom} setInputFrom={setInputFrom} inputTo={inputTo} setInputTo={setInputTo} /> : null }
            </motion.div>
          )
          }
          </AnimatePresence>
        </div>
    );
};

export default Filter;