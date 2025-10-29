import { useState, useEffect } from "react";
import { getAllRequests } from "../../api/apiFunctions.js";
import '../../Styles/adminControls.css';
import BookRequests from "./BookRequests.jsx";
import AuthorRequests from "./AuthorRequests.jsx";


const Requests = () => {
    const [bookRequests, setBookRequests] = useState(null);
    const [authorRequests, setAuthorRequests] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            const {bookResult, authorsResult} = await getAllRequests();
            console.log(bookResult);
            console.log(authorRequests);
            setBookRequests(bookResult);
            setAuthorRequests(authorsResult);
            
        };
     fetchData();
    },[]);

    return (
        <>
         {bookRequests && (<BookRequests bookRequests={bookRequests} setBookRequests={setBookRequests} />)}
         {authorRequests && (<AuthorRequests authorRequests={authorRequests} setAuthorRequests={setAuthorRequests} />)}
        </>
    )
   
}

export default Requests;