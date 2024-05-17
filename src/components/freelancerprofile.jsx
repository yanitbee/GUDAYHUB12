import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css"

export default function Frelancerprofile({prop}){

    const [freelancerData, setfreelancerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/freelancerapply/${prop}`)
            setfreelancerData(response.data);
            
          } catch (error) {
            console.error("freelacer error", error);
          }
        };
        fetchData();
      }, []);
     
      

      const [popup, setPopup] = useState(false);
  
  
      const togglePopup =()=>{
        setPopup(!popup)
      }
    
      if(popup){
        document.body.classList.add('active-popup')
      } else{
        document.body.classList.remove('active-popup')
      } 

    return(
        <>
        <div>
        {freelancerData && (
          
          <img 
          onClick={togglePopup}
          className="profilepic end-0 " 
          src={freelancerData.profilepic === "" 
                ? `${process.env.PUBLIC_URL}/image/profile.jpg` 
                : `${process.env.PUBLIC_URL}/${freelancerData.profilepic}`
              } 
          alt="Profile"
        />  
       )}
                   <div className="wrapper ">
            {popup && (
                <div className={`profilebox `}>
                    <div className="profile-content">
                    <img 
          className="ppic end-0 " 
          src={freelancerData.profilepic === "" 
                ? `${process.env.PUBLIC_URL}/image/profile.jpg` 
                : `${process.env.PUBLIC_URL}/${freelancerData.profilepic}`
              } 
          alt="Profile"
        /> <br/>
            Fullname 
            <input className="input" type="text" placeholder={freelancerData.Fullname} /><br/>
            Phonenumber
            <input className="input" type="text" placeholder={freelancerData.Phonenumber} /><br/>
            Email
            <input className="input" type="email" placeholder={freelancerData.Email} /> <br/>
            Address
            <input className="input" type="text" placeholder='Address' /> <br />
            CV
            <input  type="file" /> <br />
            Cover Letter
            
            <input className="radio" type="radio" name="gender" value="male" /> Male
            <input className="radio" type="radio" name="gender" value="female" /> Female
            <br /> <br />
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
          </div>
                  </div>
            )}
              </div>
            
        
          
    
         
       
        </div>
        </>
    )
}