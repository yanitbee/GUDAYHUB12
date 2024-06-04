import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./freelancerdetails.css"


export default function Freelancerdetails(){
  
  const location = useLocation();

    const {userid, freelancerid }= location.state || {};


  const [freelancerData, setfreelancerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/freelancerapply/${freelancerid}`)
        setfreelancerData(response.data);
        
      } catch (error) {
        console.error("freelacer error", error);
      }
    };
    fetchData();
  }, [freelancerid]);



    const [readData, setreadData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/freelancerapply/${userid}`)
          setreadData(response.data);
          
        } catch (error) {
          console.error("error", error);
        }
      };
      fetchData();
    }, [userid]);

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
        <div className="fdetails">
        {readData && (
          <div>
            <h2>Freelancer:  {readData.username}</h2> 
            <p>FullName: {readData.Fullname}</p>
            <p>Skills: {readData.skills}</p>
            <p>PhoneNumber: {readData.Phonenumber}</p>
            <p>Email: {readData.Email}</p>
            <p>Gender: {readData.Gender}</p>
            <p>Profession: {readData.title}</p>
            <p>Rating: {readData.rating}</p>
            <p>Portfolio: {readData.portfolio}</p>
            <p>CV: {readData.cv}</p>
            <button className="chat-btn" onClick={togglePopup} >Text Me</button>
            
          </div>
          
        )}
        </div>
        </>
    )
}