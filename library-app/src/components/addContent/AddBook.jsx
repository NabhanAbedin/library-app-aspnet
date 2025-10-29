import { useState } from "react";
import {motion} from 'framer-motion';
import { addBookRequest } from "../../api/apiFunctions";

const AddBook = () => {
    const [ formData, setFormData ] = useState({
        title: '',
        author: '',
        release: '',
        genre: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('form data:', formData)
            const res = await addBookRequest(formData);

            if (res.ok) {
                setFormData({title: '', author: '', release: '', genre: ''});
                alert('added book');
            }
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <motion.form 
        className="add-book-form" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="form-header">
                <h1>request a book</h1>
            </div>
            <div>
                <label htmlFor="title">Title:</label><br />
                <input 
                 type="text"
                 id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label><br />
                <input 
                 type="text"
                 id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="release">Release:</label><br />
                <input 
                 type="text"
                 id="release"
                name="release"
                value={formData.release}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                required
                />
            </div>
            <div>
                <label htmlFor="genre">Genre:</label><br />
                <input 
                 type="text"
                 id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                />
            </div>
            <motion.button 
            type="submit"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            >Add book</motion.button>
         </motion.form>
    );
};

export default AddBook;