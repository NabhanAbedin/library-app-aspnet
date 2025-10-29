import Nav from "../nav";
import {NavLink, useSearchParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import CatalogPlaceholder from "./PlaceHolder";
import BooksCatalog from "./BooksCatalog";
import AuthorsCatalog from "./AuthorsCatalog";
import GenreCatalog from "./GenreCatalog";
import '../../Styles/catalog.css';

const Catalog = () => {
    const [searchParams] = useSearchParams();
    const selected = searchParams.get('selected');

    const renderComponent = () => {
        if (selected === 'books') return <BooksCatalog />
        else if (selected === 'authors') return <AuthorsCatalog />
        else if (selected === 'genres') return <GenreCatalog />
        else return <CatalogPlaceholder />
    }

    return (
        <>
            <Nav />
            <motion.div 
            className="catalog-header"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
                <h1>View our growing catalog!</h1>
                <h3>search authors, specfic books, by genre and more</h3>
                <p>select the books you want and then we will process and ship them out for you to rent</p>
            </motion.div>
            <motion.nav 
            className="select-container"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            >   <NavLink to='/catalog?selected=books'>
                <button style={selected === 'books' ? { textDecoration: 'underline' } : {}}>Books</button>
                </NavLink>

                <NavLink to='/catalog?selected=authors'>
                <button  style={selected === 'authors' ? { textDecoration: 'underline' } : {}}>Authors</button>
                </NavLink>
                
                <NavLink to='/catalog?selected=genres'>
                <button style={selected === 'genres' ? { textDecoration: 'underline' } : {}}>Genres</button>
                </NavLink>
                
            </motion.nav>
            {renderComponent()}
        </>
    )
};

export default Catalog;