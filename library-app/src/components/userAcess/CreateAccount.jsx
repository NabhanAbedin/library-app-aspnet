import Nav from "../nav";
import { useState,useEffect} from "react";
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { logIn, createAccount } from "../../api/apiFunctions.js";
import '../../Styles/addContent.css';
import '../../Styles/userAccess.css';
import { useAuth } from "../../AuthContext.jsx";

const CreateAccount = () => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [createInfo, setCreateInfo] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    const {logInClient} = useAuth();

    const handleChange = (e) => {
        const {name, value } = e.target;
        setCreateInfo(prev => ({...prev,
             [name]:value
            }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         if (createInfo.username.trim() !== '' && createInfo.password.trim() !== '') {
            
            const createRes = await createAccount(createInfo.username, createInfo.password);
            if (createRes.ok) {
                const {res,result} = await logIn(createInfo.username, createInfo.password);
                if (res.ok) {
                    setLoggedIn(true);
                    logInClient({
                        id: result.userId,
                        username: result.username,
                        role: result.role
                    });
                };
            };
        };
    };  

    useEffect(()=> {
        if (loggedIn === true) {
            navigate('/Catalog');
        }
    },[loggedIn])

    return (
        <>
            <Nav/>
            <motion.form
             className="add-book-form login-form"
             onSubmit={handleSubmit}      
             initial={{ opacity: 0, y: 0 }}
             animate={{ opacity: 1, y: 30 }}
             transition={{ duration: 0.8, ease: 'easeOut' }}
            >   
                <div className="form-header">
                    <h1>Create an Account to lease our library</h1>
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    type="text"
                    id="username"
                    name="username"
                    value={createInfo.username}
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    value={createInfo.password}
                    onChange={handleChange}
                     />
                </div>
                <motion.button 
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                >Create</motion.button>

            </motion.form>
        
        </>
    );

};


export default CreateAccount;
