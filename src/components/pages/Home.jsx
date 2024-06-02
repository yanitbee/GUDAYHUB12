import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Home=()=> {
 
  const [inputValue, setinputValue] = useState({Usertype: '', Fullname:'', username:'', Phonenumber:"", Email:"", Password:"", Gender:"",});

  const nullvalue = useState({
    profilepic: null,
    title: null,
    skills:null,
    cv:null,
    additionaldoc:{educations : null,
                certifications: null,},
    gudayhistory:null,
    workhistory:null,
    rating:null,
    description:null,
    portfolio:{link: null,
                 title: null,},
});
  
  let [username, setusername] = useState("")
  let [password, setpassword] = useState("");
    
  const saveData = async () => {
    const isEmpty = value => {
      return value === null ||
             value === undefined ||
             value === '' ||
             (Array.isArray(value) && value.length === 0) ||
             (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);
    }
    const hasEmptyProperties = Object.values(inputValue).some(isEmpty);
    if(hasEmptyProperties){
      alert("please fillout all of the fileds")
    }
    else{
  try{
      await axios.post("http://localhost:5000/writetodatabase", {Usertype: inputValue.Usertype,Fullname: inputValue.Fullname,username: inputValue.username,  Phonenumber: inputValue.Phonenumber, Email: inputValue.Email, Password: inputValue.Password, Gender: inputValue.Gender,title: "", profilepic: "", nullvalue })
      console.log("data: ", nullvalue)
      setPopup(!popup)
  } catch(error){
      console.log("errorr", error)
  }
}
  }

  let navigate = useNavigate();

      const forLogin = async () => {

        try{
         const responce = await axios.get(`http://localhost:5000/login/${username}`)
         if(!responce || !responce.data ){
          alert("error loging in ckeck your credentials")
          return;
         }
         
         const usercheck = responce.data[0]
         console.log(responce.data)

         if(usercheck.username === username && usercheck.Password === password){
          if(usercheck.Usertype=== "employer"){
            navigate("employerpage", {state:{employerid:usercheck._id }})
          }else if(usercheck.Usertype=== "freelancer"){
            navigate("freelancerpage", {state:{freelancerid:usercheck._id }})
          }
         }else{

          alert("error loging in ckeck your credentials")
         }
         
        }
        catch(error){
          if (error.response && error.response.status === 404) {
          alert("error loging in ckeck your credentials")
          }else{
          console.error("Error checking user:", error);
          }
        }
      } 


  
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
      <div className={`wrapper`}>
      {popup && (
        <div className={`popup`}>
        <div onClick={togglePopup} className="overlay"></div>
          <div className={`popup-content${action}`}>
          <div className="login-popup">
        <h3 className="h3-login">LogIn</h3>
        <input className="input" type="text" placeholder='Username' 
        onChange={e=>setusername(e.target.value)}/> 
            <input className="input" type="password" placeholder='Password'
             onChange={e=>setpassword(e.target.value)} /> <br />
            <button className='popup-btn' onClick={forLogin}>LogIn</button>
            <p>Don't have an account. <a href="#" onClick={registerLink}>Register</a></p>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
        </div>
        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

            <h3 className="h3-register">Register</h3>
            <input type="radio" name="user" value="freelancer" 
            onChange={e=>setinputValue({...inputValue, Usertype:e.target.value})}/> Freelancer

            <input type="radio" name="user" value="employer"
            onChange={e=>setinputValue({...inputValue, Usertype:e.target.value})} /> Employer <br />

            <input className="input" type="text" placeholder='Fullname' 
            onChange={e=>setinputValue({...inputValue, Fullname:e.target.value})}/>

<input className="input" type="text" placeholder='Username' 
            onChange={e=>setinputValue({...inputValue, username:e.target.value})}/>

            <input className="input" type="text" placeholder='Phonenumber' 
            onChange={e=>setinputValue({...inputValue, Phonenumber:e.target.value})}/>

            <input className="input" type="email" placeholder='Email' 
            onChange={e=>setinputValue({...inputValue, Email:e.target.value})}/> 

            <input className="input" type="password" placeholder='Password' 
            onChange={e=>setinputValue({...inputValue, Password:e.target.value})}/> <br />

            <input className="radio" type="radio" name="gender" value="male" 
            onChange={e=>setinputValue({...inputValue, Gender:e.target.value})}/> Male
            <input className="radio" type="radio" name="gender" value="female"
            onChange={e=>setinputValue({...inputValue, Gender:e.target.value})} /> Female
            <br /> <br />
            <button className='popup-btn' onClick={saveData}  >Submit</button>
            <p>Already have an account. <a href="#" onClick={loginLink}>LogIn</a></p>
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
