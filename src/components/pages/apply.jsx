import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../apply.css"


export default function Apply(){
  
  const location = useLocation();

    const {postid, freelancerid }= location.state || {};


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
  }, []);

  const [inputValue, setinputValue] = useState({Freelancerid: '',postid:"", Coverletter:""})

  const saveData = async () => {
    try{
        await axios.post("http://localhost:5000/writeapplicant", {Freelancerid: freelancerid, postid: readData. _id, Coverletter: inputValue.Coverletter })
        console.log("data: ", inputValue)
        setPopup(!popup)
        alert("application sent")
    } catch(error){
        console.log("errorr", error)
    }
    }

    const [readData, setreadData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/search/${postid}`)
          setreadData(response.data);
          
        } catch (error) {
          console.error("error", error);
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
        {readData && (
          <div>
            <h2>Job Type: {readData.Jobtype}</h2>
            <p>Job Title: {readData.Jobtitle}</p>
            <p>Description: {readData.Description}</p>
            <p>Qualification: {readData.Qualification}</p>
            <p>Salary: {readData.Salary}</p>
            <p>location: {readData.location}</p>
            <p>Contact: {readData.Contact}</p>
            <p>PostedDate: {readData.PostedDate}</p>
            <p>Deadline: {readData.Deadline}</p>
            <button  onClick={togglePopup} >apply</button>
            <div className="wrapper">
            {popup && (
                <div className={`form`}>
                    <div className="form-content">
            <h3 className="">Application for {readData.Jobtitle} position</h3>
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
            <input className="input" type="text" placeholder='coverletter' value={inputValue.Coverletter}
              onChange={e => setinputValue({ ...inputValue, Coverletter: e.target.value}) } /> <br />
            <input className="radio" type="radio" name="gender" value="male" /> Male
            <input className="radio" type="radio" name="gender" value="female" /> Female
            <br /> <br />
            <button className='popup-btn' onClick={saveData} >Submit</button>
            <button className='popup-btn' id='x' onClick={togglePopup}>X</button>
          </div>
                  </div>
            )}
              </div>
            
          </div>
          
        )}
        </div>
        </>
    )
}