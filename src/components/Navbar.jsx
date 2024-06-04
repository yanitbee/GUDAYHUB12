import React, { useState, useEffect } from 'react';
import { useLocation, Link as RouterLink, useNavigate} from 'react-router-dom';
import { Link } from 'react-scroll';
import logo from './images/logo.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const ConfirmLink = ({ to, children, message }) => {
    const handleClick = (e) => {
      e.preventDefault();
      if (window.confirm(message)) {
        navigate(to);
      }
    };

    return (
      <RouterLink to={to} onClick={handleClick}>
        {children}
      </RouterLink>
    );
  };

  const renderNavLinks = () => {
    switch (location.pathname) {
      case '/':
        return (
          <>
            <li><Link to='main' smooth={true} duration={500}>Home</Link></li>
            <li><Link to='service' smooth={true} duration={500}>Service</Link></li>
            <li><Link to='about' smooth={true} duration={500}>About</Link></li>
            <li><Link to='contact' smooth={true} duration={500}>Contact</Link></li>
            <li><Link to='register' smooth={true} duration={500}>Register</Link></li>
          </>
        );
      case '/employerpage':
        return (
          <>
            <li><RouterLink to='/'>Home</RouterLink></li>
            <li><RouterLink to="/employerpage/Write">Post</RouterLink></li>
            <li><RouterLink to="/applicants">Applicants</RouterLink></li>
            <li><ConfirmLink to="/" message="Are you sure you want to log out?">LogOut</ConfirmLink></li>
          </>
        );
        case '/freelancerpage':
            return (
              <>
                <li><RouterLink to="/">Home</RouterLink></li>
                <li><RouterLink to="/taskmanager">Task Manager</RouterLink></li>
                <li><RouterLink to="/message">Message</RouterLink></li>
                <li><ConfirmLink to="/" message="Are you sure you want to log out?">LogOut</ConfirmLink></li>
              </>
            );

      default:
        return (
          <>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </>
        );
    }
  };

  return (
    <nav className={nav ? 'nav active' : 'nav'}>
      <RouterLink to='main' className='logo'>
        <img src={logo} alt="" />
      </RouterLink>
      <input className='menu-btn' type='checkbox' id='menu-btn' />
      <label className='menu-icon' htmlFor='menu-btn'>
        <span className='nav-icon'></span>
      </label>
      <ul className='menu'>
        {renderNavLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
