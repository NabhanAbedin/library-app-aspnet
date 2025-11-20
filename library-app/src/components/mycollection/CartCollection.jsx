import { useEffect, useState } from "react";
import { userCarts, removeFromCart, addToCheckOut} from "../../api/apiFunctions";
import {motion} from 'framer-motion';
import { getCart, deleteCartItem, addCollectionToCheckedout  } from "../../api/myCollectionApi";

const CartCollection = ({reRender, setReRender}) => {
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);
    

    useEffect(()=> {
        const fetchData = async () => {
            const result = await getCart();
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
        const res = await addCollectionToCheckedout(cart);
        if (res.ok) {
            setData(prev => prev.filter(c => !cart.includes(c.book_id)));
                setReRender(prev => !prev);
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
                            onClick={() => handleCart(data.bookId)}
                            style={cart.includes(data.bookId) ? { backgroundColor: '#f5f5f5' } : undefined}
                            >
                                <td className="book-title-cell">{data.bookTitle}</td>
                                <td className="book-author-cell">{data.authorName}</td>
                                <td className="book-genre-cell">
                                    <span className="book-genre-tag">{data.genreType}</span>
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
                    >Submit</motion.button>
                </div>
               </>
            )}

        </>
    )
};

export default CartCollection;