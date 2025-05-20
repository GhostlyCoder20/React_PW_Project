import React from 'react'
import './header.css'
import 'boxicons';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return  <header className='header'>
    <div className='nav container'>

     <a href='home' className='logo'>
         Room<span>Cinema</span>
     </a>

         <div className='search-box'>
             <input type='search' name='' id='search-input' placeholder='Search movie'></input>
             <i className='bx bx-search'></i>
         </div>

         <a href='home' className='user'>
             <img src='' alt='' className='user-img'></img>
         </a>

         <div className='navbar'>
             <a href='home' className='nav-link nav-active'>
                 <i className='bx bx-home'></i>
                 <span className='nav-link-title'>Home</span>
             </a>
             <a href='home' className='nav-link'>
                 <i className='bx bxs-hot'></i>
                 <span className='nav-link-title'>Trending</span>
             </a>
             <a href='home' className='nav-link'>
                 <i className='bx bx-compass'></i>
                 <span className='nav-link-title'>Explore</span>
             </a>
             <Link to={'/admin'} className='nav-link'>
                 <i className='bx bx-heart'></i>
                 <span className='nav-link-title'>Administration</span>
             </Link>
         </div>
    </div>
 </header>
}


export default Header;