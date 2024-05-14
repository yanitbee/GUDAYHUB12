import React, {useState} from 'react'
import logo from './images/logo.png'
import {Link} from 'react-scroll'

const Navbar=()=> {

const [nav,setnav] = useState(false);

const changeBackground = () => {
    if (window.scrollY >= 50) {
        setnav(true)
    }
    else{
        setnav(false)
    }
}
window.addEventListener('scroll',changeBackground)

  return (
 <nav style={{border:"solid"}} className={nav ? "nav active" :"nav"}>
    <Link to='#' className='logo'>
        <img src={logo} alt="" />
     </Link>
     <input className='menu-btn' type='checkbox' id='menu-btn'/>
     <label className='menu-icon' htmlFor='menu-btn'>
        <span className='nav-icon'></span>
     </label>
     <ul className='menu'>
        <li><Link to='main' smooth={true} duration={500}>Home</Link></li>
        <li><Link to='helpidk' smooth={true} duration={500}>Helpidk</Link></li>
        <li><Link to='#' smooth={true} duration={500}>About</Link></li>
        <li><Link to='#' smooth={true} duration={500}>Contact</Link></li>
        <li><Link to='main' smooth={true} duration={500}>Register</Link></li>
     </ul>
 </nav>
  )
}

export default Navbar
