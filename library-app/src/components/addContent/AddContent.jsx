import Nav from "../nav";
import AddBook from "./AddBook";
import AddAuthor from "./AddAuthor";
import '../../Styles/addContent.css';
import {motion} from 'framer-motion';

const AddContent = () => {
    
    return (
        <>
            <Nav />
            <motion.div className="add-content-header"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h3>Didnt find what you were looking for?</h3>
                <p>submit a book or author you want to be added to our collection, we will review it and add it to our Library!</p>

            </motion.div>
            <div className="content-forms">
                <AddBook />
                <AddAuthor />
            </div>
        

        </>
    );
};

export default AddContent;