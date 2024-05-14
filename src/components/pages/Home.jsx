import React, {useState} from 'react'

const Home=()=> {
  
    const [action, setAction] = useState('');

    const loginLink = () =>{
      setAction('active')
    }
    const registerLink = () =>{
      setAction('')
    }

      const [popup, setPopup] = useState(false);
  
  
  const togglePopup =()=>{
    setPopup(!popup)
  }

  if(popup){
    document.body.classList.add('active-popup')
  } else{
    document.body.classList.remove('active-popup')
  }

  return (
    <div id='main'>

      <div className='header-heading'>
      <h2>Connecting Freelancers and Employers</h2>
      <h2><span>By Zagol</span></h2>
      
      <div className='header-btns'>
        <button className='header-btn' onClick={togglePopup}>Register Now</button>
      <div className="wrapper">
      {popup && (
        <div className={`popup${action}`}>
        <div onClick={togglePopup} className="overlay"></div>
          <div className="popup-content">
            <h3 className="h3-register">Register</h3>
            <input type="radio" name="user" value="freelancer" /> Freelancer
            <input type="radio" name="user" value="employer" /> Employer <br />
            <input className="input" type="text" placeholder='Fullname' />
            <input className="input" type="text" placeholder='Phonenumber' />
            <input className="input" type="email" placeholder='Email' /> 
            <input className="input" type="password" placeholder='Password' /> <br />
            <input className="radio" type="radio" name="gender" value="male" /> Male
            <input className="radio" type="radio" name="gender" value="female" /> Female
            <br /> <br />
            <button className='popup-btn' >Submit</button>
            <p>Already have an account. <a href="#" onClick={loginLink}>LogIn</a></p>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
          </div>
        <div className="login-popup">
        <h3 className="h3-login">LogIn</h3>
        <input className="input" type="text" placeholder='Username' /> 
            <input className="input" type="password" placeholder='Password' /> <br />
            <button className='popup-btn' >LogIn</button>
            <p>Don't have an account. <a href="#" onClick={registerLink}>Register</a></p>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
        </div>
      </div>

         
      )}
      </div> 
      
    </div>
</div>
    </div>

  )
  
}

export default Home
