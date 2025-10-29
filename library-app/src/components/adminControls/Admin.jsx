import Nav from "../nav";
import { useAuth } from "../../AuthContext";
import { useNavigate, useSearchParams,NavLink } from "react-router-dom";
import '../../Styles/adminControls.css';
import {motion} from 'framer-motion';
import Returns from "./Returns";
import Requests from "./Requests";

const Admin = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selected = searchParams.get('selected');

    if (!user || user.role != 'admin') {
        navigate('/');
    }

    const renderComponent = () => {
        if (selected === 'returns') return <Returns />
        else if (selected === 'requests') return <Requests />
    }

    return (
        <>
        <Nav />
        <motion.nav 
            className="select-container admin-controls"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            >   <NavLink to='/Admin?selected=returns'>
                <button style={selected === 'returns' ? { textDecoration: 'underline' } : {}}>Returns</button>
                </NavLink>


                <NavLink to='/Admin?selected=requests'>
                <button  style={selected === 'requests' ? { textDecoration: 'underline' } : {}}>Requests</button>
                </NavLink>  

            </motion.nav>
        <div className="selected-container">
            {renderComponent()} 
        </div>

        </>
    )
}

export default Admin;