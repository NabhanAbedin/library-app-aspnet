import {Link, useNavigate} from 'react-router-dom';
import '../styles/nav.css';
import { useState, useEffect } from 'react';
import { logOut } from '../api/apiFunctions';
import { useAuth } from '../AuthContext';


const Nav = () => {
  const navigate = useNavigate();
  const{user, logOutClient} = useAuth();
 

  const handleLogInNav = () => {
    if (user) {
      return (
        <button className='nav-button' onClick={async () => {
          try { 
            const res = await logOut();
            if (res.ok) {
              logOutClient();
              navigate('/');
            }

          } catch (err) {
            console.log(err);
          }
        }}>
            Log out
        </button>
       
      )
    }
    return (
      <Link to='/Login' className='nav-link'>
      Log in
      </Link>
    )
  }


  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-links">
            <Link to='/' className="nav-link">
              Library
            </Link>
            <Link to='/addContent' className="nav-link">
              add content
            </Link>
            <Link to='/Catalog' className="nav-link">
              Catalog
            </Link>
            {user && (
              <Link to='/myCollection' className="nav-link">
              My collection
              </Link>
            )}
            {user && user.role === 'admin' && (
              <Link to='/Admin' className="nav-link">
              Admin Controls
              </Link>
            )}
            {handleLogInNav()}
          </div>
          
          <button className="nav-mobile-btn">
            <svg className="nav-hamburger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;