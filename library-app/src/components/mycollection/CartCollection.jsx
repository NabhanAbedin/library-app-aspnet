import { useEffect, useState } from "react";
import { userCarts, removeFromCart, addToCheckOut} from "../../api/apiFunctions";
import {motion} from 'framer-motion';

const CartCollection = ({reRender, setReRender}) => {
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);
    

    useEffect(()=> {
        const fetchData = async () => {
            const result = await userCarts();
            console.log(result);
            setData(result);
        }
        fetchData();
    },[]);

    const handleCart = (bookId) => {
        setCart(prev =>
            prev.includes(bookId)
              ? prev.filter(id => id !== bookId)
              : [...prev, bookId]
          );
    }

    const handleSubmit = async () => {
        const res = await addToCheckOut(cart);
        if (res.ok) {
            setData(prev => prev.filter(c => !cart.includes(c.book_id)));
            console.log('success');
            const result = await removeFromCart(cart);
            if (result.ok) {
                setReRender(prev => !prev);
            }
        } else if (res.status === 409) {
            alert('You cannot check out more than 5 books at a time');
            setCart([]);
        } else if (res.status === 422) {
            alert('one of the books isnt available');
            setCart([]);
        }
    }

    return (
        <>
            {data && (
                <>
                <div className="books-table-container">
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(data => (
                            <tr 
                            key={data.id}
                            onClick={() => handleCart(data.book_id)}
                            style={cart.includes(data.book_id) ? { backgroundColor: '#f5f5f5' } : undefined}
                            >
                                <td className="book-title-cell">{data.book_title}</td>
                                <td className="book-author-cell">{data.author_name}</td>
                                <td className="book-genre-cell">
                                    <span className="book-genre-tag">{data.genre_type}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
               <div className="button-container">
                    <motion.button 
                    className="search-button" 
                    onClick={() => handleSubmit()}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    >submit</motion.button>
                </div>
               </>
            )}

        </>
    )
};

export default CartCollection;