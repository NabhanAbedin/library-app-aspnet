import {motion} from 'framer-motion';
import { formatRelease, addToCart } from '../../api/apiFunctions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const BooksTable = ({books}) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const {user} = useAuth();
    

    const handleSelect = (bookId) => {
      setCart(prev =>
        prev.includes(bookId)
          ? prev.filter(id => id !== bookId)
          : [...prev, bookId]
      );
    };

    const checkOut = async () => {
        if (user) {
            const res = await addToCart(cart);
            if (res.ok) navigate('/myCollection')
        } else {
            navigate('/Login');
        };   
    }
    
    return (
    <>
        <div className="books-table-container">
        <table className="books-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Release Date</th>
                    <th>Available</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr 
                    key={book.id}
                    style={cart.includes(book.id) ? { backgroundColor: '#f5f5f5' } : undefined}
                    onClick={() => handleSelect(book.id)}
                    >
                        <td className="book-title-cell">{book.book_title}</td>
                        <td className="book-author-cell">{book.author_name}</td>
                        <td className="book-genre-cell">
                            <span className="book-genre-tag">{book.genre_type}</span>
                        </td>
                        <td className="book-release-cell">{formatRelease(book.release)}</td>
                        <td className="book-genre-cell">
                            <span className="book-genre-tag">{book.available}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
       <div className="checkout-button">
            <motion.button
            onClick={checkOut}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            >checkout</motion.button>
       </div>
    </>
    );
};

export default BooksTable;