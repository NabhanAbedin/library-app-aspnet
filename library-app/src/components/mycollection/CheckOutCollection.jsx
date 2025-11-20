import { useEffect, useState } from "react";
import { formatRelease } from "../../api/apiFunctions";
import {motion} from 'framer-motion';
import { getCheckedoutItems } from "../../api/myCollectionApi";

const CheckedOutCollection = ({reRender, setReRender}) => {
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);
    

    useEffect(()=> {
        const fetchData = async () => {
             const result = await getCheckedoutItems();
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
                            onClick={() => handleCart(data.bookId)}
                            style={cart.includes(data.bookId) ? { backgroundColor: '#f5f5f5' } : undefined}
                            >
                                <td className="book-title-cell">{data.bookTitle}</td>
                                <td className="book-author-cell">{data.authorName}</td>
                                <td className="book-genre-cell">
                                    <span className="book-genre-tag">{formatRelease(data.checkedOutTime)}</span>
                                </td>
                                <td className="book-genre-cell">
                                    <span className="book-genre-tag">{formatRelease(data.dueDate)}</span>
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