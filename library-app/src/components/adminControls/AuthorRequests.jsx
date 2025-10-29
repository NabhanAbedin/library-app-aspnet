import { useState, useEffect } from "react";
import {motion} from 'framer-motion';
import {  removeFromRequests,  addAuthorToCatalog } from "../../api/apiFunctions.js";


const AuthorRequests = ({authorRequests, setAuthorRequests}) => {
    const [cart, setCart] = useState([]);

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
       if (cart.length === 0) {
        alert('No authors selected');
        return;
       }
       
       const res = await addAuthorToCatalog(cart);
       if (res.ok) {
        alert('added books to catalog');
        const cartIds = cart.map(c => c.id);
        setAuthorRequests(prev =>
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
                        <th>Name</th>
                        <th>Bio</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {authorRequests.map(requests => (
                        <tr 
                        key={requests.id}
                        style={cart.some(item => item.id === requests.id) ? { backgroundColor: '#A9A9A9' } : undefined}
                        onClick={() => updateCart(requests)}
                        >
                            <td className="book-title-cell">{requests.author_name}</td>
                            <td className="book-author-cell">{requests.author_bio}</td>
                            <td className="book-genre-cell">
                                <span className="book-genre-tag">{requests.author_age}</span>
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
                >Add to Authors</motion.button>
            </div>
        </>
    )
}

export default AuthorRequests;