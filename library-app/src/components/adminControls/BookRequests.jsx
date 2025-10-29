import { useState, useEffect } from "react";
import {motion} from 'framer-motion';
import {  removeFromRequests, addBookToCatalog, formatRelease } from "../../api/apiFunctions.js";


const BookRequests = ({bookRequests, setBookRequests}) => {
    const [cart, setCart] = useState([]);
    const [availableBooks, setAvailableBooks] = useState({});

    useEffect(()=> {
        const initial = bookRequests.reduce((acc, requests)=> {
            acc[requests.id] = '';
            return acc;
        },{})
        setAvailableBooks(initial);
    },[bookRequests])

    const updateCart = (request) => {
        setCart(prev => {
            if (prev.some(item => item.id === request.id) ) {
             return prev.filter(item => item.id !== request.id)
            } else {
             return [...prev, request];
            }
        })
    }

    const addCartToCatalog = async () => {
       const check = cart.every(item => availableBooks[item.id].trim() !== '');
       if (!check || cart.length == 0) {
        alert('One of the books dont have a inteventory amount');
        return;
       }
       const updatedCart = cart.map(item => {
        return {
          ...item,
          available: parseInt(availableBooks[item.id], 10)
        };
      });
    
       console.log(updatedCart);
       const res = await addBookToCatalog(updatedCart);
       if (res.ok) {
        alert('added books to catalog');
        const cartIds = cart.map(c => c.id);
        setBookRequests(prev =>
            prev.filter(request => !cartIds.includes(request.id))
          );
        await removeFromRequests(cartIds);
        setCart([]);
       }
       if (res.status === 404) {
        'check you selected the items'
       }
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
                    {bookRequests.map(requests => (
                        <tr 
                        key={requests.id}
                        style={cart.some(item => item.id === requests.id) ? { backgroundColor: '#A9A9A9' } : undefined}
                        onClick={() => updateCart(requests)}
                        >
                            <td className="book-title-cell">{requests.title}</td>
                            <td className="book-author-cell">{requests.author}</td>
                            <td className="book-genre-cell">
                                <span className="book-genre-tag">{requests.genre}</span>
                            </td>
                            <td className="book-release-cell">{formatRelease(requests.release)}</td>
                            <td className="book-genre-cell">
                              <span className="book-genre-tag">
                                <input 
                                type="number"
                                step={1}
                                min={1}
                                max={2}
                                className="available-input"
                                value={availableBooks[requests.id] || ''}
                                onChange={e => setAvailableBooks(prev => ({
                                    ...prev,
                                    [requests.id]: e.target.value
                                }))}
                                 />
                              </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="checkout-button">
                <motion.button
                onClick={() => addCartToCatalog()}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                >Add to Catalog</motion.button>
            </div>
        </>
    )
}

export default BookRequests;