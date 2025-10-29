import Nav from "../nav";
import { useState,useEffect} from "react";
import {motion} from 'framer-motion';
import { useNavigate, Link } from "react-router-dom";
import { logIn } from "../../api/apiFunctions.js";
import '../../Styles/addContent.css';
import '../../Styles/userAccess.css';
import InValid from "./invalid.jsx";
import { useAuth } from "../../AuthContext.jsx";

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    const {logInClient} = useAuth();

    const handleChange = (e) => {
        const {name, value } = e.target;
        setLoginInfo(prev => ({...prev,
             [name]:value
            }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginInfo.username.trim() !== '' && loginInfo.password.trim() !== '') {
            const {res,result} = await logIn(loginInfo.username, loginInfo.password);
            if (res.ok) {
                setLoggedIn(true);
                logInClient({
                    id: result.userId,
                    username: result.username,
                    role: result.role
                });
            } else if (result.error === 'invalid username') {
                setLoggedIn('usernameError');
            } else if (result.error === 'invalid password') {
                setLoggedIn('passwordError');
            }
        } 
    };

    useEffect(()=> {
        if (loggedIn === true) {
            navigate('/myCollection');
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
                    <h1>Log in to our library</h1>
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    type="text"
                    id="username"
                    name="username"
                    value={loginInfo.username}
                    onChange={handleChange}
                     />
                     {loggedIn === 'usernameError' ? <InValid invalidName={'username'}/> : null}
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                     />
                     {loggedIn === 'passwordError' ? <InValid invalidName={'password'}/> : null}
                </div>
                <motion.button 
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                >Log in</motion.button>

                <div className="create-container">
                    <p>Dont Have an account with us? create one <Link to='/CreateAccount'>
                    here
                    </Link></p>
                </div>

            </motion.form>
        
        </>
    );
};


export default Login;
