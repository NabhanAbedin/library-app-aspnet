import {motion} from 'framer-motion';
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';
import '../../Styles/mycollection.css';
import Nav from '../nav';
import CartCollection from './CartCollection';
import Checkout from '../checkout/checkout';
import CheckedOutCollection from './CheckOutCollection';
import { useState } from 'react';

const MyCollection = () => {
    const {user, loading} = useAuth();
    const [reRender, setReRender] = useState(false);

    if (!user && !loading) {
        return <Navigate to='/Login' />
    };
    
    return (
    <>
      {user && (
        <>
        <Nav />
             <motion.div
              className='mycollection-header'
              initial ={{opacity: 0, y: -30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, ease: 'easeIn'}}
              >
                 <h1>Welcome {user.username}!</h1>
                 <p>Check out the books you want to rent out and see the books you currently have with us!</p>
             </motion.div>
             <motion.div
              className='mycollection-container'
              initial ={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, ease: 'easeIn'}}
              >
                 <h2>Your current cart</h2>
                 <CartCollection reRender={reRender} setReRender={setReRender}/>
             </motion.div>
             <div className='mycollection-container'>
                 <h2>Your current books from us</h2>
                 <CheckedOutCollection reRender={reRender} setReRender={setReRender}/>
             </div>
        </>
      )}
      </>
    )
};

export default MyCollection;