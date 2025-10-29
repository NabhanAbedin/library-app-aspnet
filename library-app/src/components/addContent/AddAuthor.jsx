import { useState } from "react";
import {motion} from 'framer-motion';
import { addAuthorRequest } from "../../api/apiFunctions";

const AddAuthor = () => {
    const [ formData, setFormData ] = useState({
        name: '',
        bio: '',
        age: '',
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
            const res = await addAuthorRequest(formData);

            if (res.ok) {
                setFormData({
                    name: '',
                    bio: '',
                    age: '',
                });
                alert('added author');
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
                <h1>request an author</h1>
            </div>
            <div>
                <label htmlFor="name">Name:</label><br />
                <input 
                 type="text"
                 id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="bio">Bio:</label><br />
                <input 
                 type="text"
                 id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label><br />
                <input 
                 type="text"
                 id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                />
            </div>
            <motion.button 
            type="submit"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            >Add Author</motion.button>
         </motion.form>
    );
};

export default AddAuthor;