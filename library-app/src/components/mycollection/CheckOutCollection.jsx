import { useEffect, useState } from "react";
import { getCheckOut, formatRelease } from "../../api/apiFunctions";
import {motion} from 'framer-motion';

const CheckedOutCollection = ({reRender, setReRender}) => {
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);
    

    useEffect(()=> {
        const fetchData = async () => {
             const result = await getCheckOut();
             console.log(result)
             setData(result);
        }
        fetchData();
    },[reRender]);

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
                            <th>Checked out at</th>
                            <th>Due date</th>
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
                                    <span className="book-genre-tag">{formatRelease(data.check_out_at)}</span>
                                </td>
                                <td className="book-genre-cell">
                                    <span className="book-genre-tag">{formatRelease(data.due_date)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
               </>
            )}

        </>
    )
};

export default CheckedOutCollection;