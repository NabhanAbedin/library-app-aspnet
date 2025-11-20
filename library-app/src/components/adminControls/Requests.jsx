import { useState, useEffect } from "react";
import { getAllRequests } from "../../api/apiFunctions.js";
import { getRequests } from "../../api/requestsApi.js";
import '../../Styles/adminControls.css';
import BookRequests from "./BookRequests.jsx";
import AuthorRequests from "./AuthorRequests.jsx";


const Requests = () => {
    const [bookRequests, setBookRequests] = useState(null);
    const [authorRequests, setAuthorRequests] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            const {bookRequests, authorRequests, genreRequests} = await getRequests();
            console.log(bookRequests);
            console.log(authorRequests);
            setBookRequests(bookRequests);
            setAuthorRequests(authorRequests);

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