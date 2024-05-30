import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./profile.css"

export default function Frelancerprofile({prop}){
  const [inputValue, setinputValue] = useState({title: ''})

  const inputref = useRef(null)
  const [freelancerData, setfreelancerData] = useState([]);
 

    const handleImage = () =>{
        inputref.current.click();
    }

    const uploadimg = async (e) =>{
        const file = e.target.files[0];
       
        if (file) {
          await editpic(file);
        }
        
    }

    
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
     


      const editpic = async (file) => {

        const formData = new FormData();
        formData.append('file', file);
        try {
          const response =  await axios.put(`http://localhost:5000/freelancerpicedit/${prop}`,  formData,
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
           await axios.put(`http://localhost:5000/freelanceredit/${prop}`,  formData,
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
        {freelancerData && (
          
          <img 
          onClick={togglePopup}
          className="profilepic " 
          src={freelancerData.profilepic === "" || freelancerData.profilepic===null 
                ? `${process.env.PUBLIC_URL}/image/profile.jpg`
                : `${process.env.PUBLIC_URL}/${freelancerData.profilepic}`
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
          src={freelancerData.profilepic === "" || freelancerData.profilepic===null
                ? `${process.env.PUBLIC_URL}/image/profile.jpg` 
                : `${process.env.PUBLIC_URL}/${freelancerData.profilepic}`
              } 
          alt="Profile"
        /> 
        <input onChange={uploadimg} type="file"  ref={inputref} style={{display:"none"}}/> 
        </div>

        <br/>
        {freelancerData.Fullname} <br/>
        {freelancerData.Email}<br/>

            <input  onChange={e => setinputValue({ ...inputValue, title: e.target.value}) } className="input" type="text" placeholder='Address' /> <br />
            CV
            <input  type="file" /> <br />
            
            <input className="radio" type="radio" name="gender" value="male" /> Male
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