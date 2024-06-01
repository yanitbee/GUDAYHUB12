import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./profile.css"

export default function Employerprofile({prop}){
  const [inputValue, setinputValue] = useState({title: ''})

  const inputref = useRef(null)
  const [employerData, setemployerData] = useState([]);
 

    const handleImage = () =>{
        inputref.current.click();
    }

    const uploadimg = async (e) =>{
        const file = e.target.files[0];
       
        if (file) {
          await editpic(file);
        }
        
    }

    
    /*useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/freelancerapply/${prop}`)
            setemployerData(response.data);
            
          } catch (error) {
            console.error("employer error", error);
          }
        };
        fetchData();
      }, []);
     
*/

      const editpic = async (file) => {

        const formData = new FormData();
        formData.append('file', file);
        try {
          const response =  await axios.put(`http://localhost:5000/employerpicedit/${prop}`,  formData,
          {  headers: {
          'Content-Type': 'multipart/form-data'
        }})
        } catch (error) {
          console.error("errorr", error);
        }
      };
      
 


     
        const editData = async () => {

          const formData = new FormData();
          
          formData.append('title', inputValue.title);
          try {
           await axios.put(`http://localhost:5000/employeredit/${prop}`,  formData,
            {  headers: {
            'Content-Type': 'multipart/form-data'
          }})

          } catch (error) {
            console.error("errorr", error);
          }
        };
     
  

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
        <div className="holder end-0">
        {employerData && (
          
          <img 
          onClick={togglePopup}
          className="profilepic " 
          src={employerData.profilepic === "" || employerData.profilepic===null 
                ? `${process.env.PUBLIC_URL}/image/profile.jpg`
                : `${process.env.PUBLIC_URL}/${employerData.profilepic}`
              } 
          alt="Profile"
        />
       )}
       </div> 
                   <div className="wrapper ">
            {popup && (
                <div className={`profilebox `}>
                    <div className="profile-content">

                        <div className="pholder  "  onClick={handleImage}>
                    <img 
          className="ppic " 
          src={employerData.profilepic === "" || employerData.profilepic===null
                ? `${process.env.PUBLIC_URL}/image/profile.jpg` 
                : `${process.env.PUBLIC_URL}/${employerData.profilepic}`
              } 
          alt="Profile"
        /> 
        <input onChange={uploadimg} type="file"  ref={inputref} style={{display:"none"}}/> 
        </div>

        <br/>
        {employerData.Fullname} <br/>
        {employerData.Email}<br/>
        <input type="text" placeholder="Phonenumber"/> <br /> <br />
        <input type="email" placeholder="email"/> <br /> <br />
            
            <input className="radio" type="radio" name="gender" value="male" /> Male <br />
            <input className="radio" type="radio" name="gender" value="female" /> Female
            <br /> <br />
            <button className='popup-btn' onClick={editData} >Submit</button>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
          </div>
                  </div>
            )}
              </div>
            
        
          
    
         
       
        </div>
        </>
    )
}