import { useState,useEffect } from "react";
import { adminGetCheckedOut, updateReturn, formatRelease } from "../../api/apiFunctions";
import {motion} from 'framer-motion';


const Returns = () => {
    const [data, setData] = useState(null);
    const [returnedDates, setReturnedDates] = useState({})

    useEffect(()=> {
        const fetchData = async () => {
            const result = await adminGetCheckedOut();
            console.log(result);
            setData(result);
        };
     fetchData();
    },[]);

    useEffect(()=> {
        if (!data) return;
        const initial =  data.reduce((acc, d) => {
            acc[d.id] = d.returned_at ? formatRelease(d.returned_at) : '';
            return acc;
        },{})
        setReturnedDates(initial);
    },[data]);

    const handleUpdateReturn = async (date, checkedOutId, bookId) => {
            if (!date || date.trim() === '') return;
            const res = await updateReturn(date, checkedOutId, bookId);
            if (res.ok) alert('updated return');
            else alert('could not update return');
    }



    return (
       <>
        {data && (
          <div className="books-table-container">
          <table className="books-table">
              <thead>
                  <tr>
                      <th>Username</th>
                      <th>Book</th>
                      <th>Author</th>
                      <th>checked out at</th>
                      <th>due date</th>
                      <th>returned at</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map(data => (
                      <tr 
                      key={data.id}
                      > 
                          <td className="book-title-cell">{data.username}</td>
                          <td className="book-title-cell">{data.book_title}</td>
                          <td className="book-author-cell">{data.author_name}</td>
                          <td className="book-genre-cell">
                              <span className="book-genre-tag">{formatRelease(data.check_out_at)}</span>
                          </td>
                          <td className="book-genre-cell">
                              <span className="book-genre-tag">{formatRelease(data.due_date)}</span>
                          </td>
                          <td className="book-genre-cell">
                              <span className="book-genre-tag">
                                <input 
                                type="text"
                                className="return-input"
                                value={returnedDates[data.id] || ''}
                                onChange={e => setReturnedDates(prev => ({
                                    ...prev,
                                    [data.id]: e.target.value
                                }))}
                                onBlur={() => handleUpdateReturn(returnedDates[data.id], data.id, data.book_id)}
                                 />
                              </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
         </div> 
        )}
       </>
    )
}

export default Returns;