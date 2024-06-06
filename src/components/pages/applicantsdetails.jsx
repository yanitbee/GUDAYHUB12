import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function Applicantsdetails(){
    const [readData, setreadData] = useState([]);
    
    const location = useLocation();

    const {postid }= location.state || {};


    useEffect(() => {
      const fetchData = async () => {
        try {
         await axios.get("http://localhost:5000/readjobapplicant" ,{
          params: { postid: postid }
        })
            .then((ApplicantModel) => setreadData(ApplicantModel.data));
            
        } catch (error) {
          console.error("error", error);
        }
      };
      fetchData();
    }, [postid]);

    


    return(
        <>
     <div className="container">
        {readData.map((data) => (
         <div  className="freelist" >
             <div>
             <h3 className="textf">Job title </h3>
          <p className="titlef">{data.Jobtitle}</p>
          </div>
             <h3 className="textf">Job type </h3>
          <p className="titlef">{data.Jobtype}</p>
          <h3 className="textf">Cover Letter </h3>
          <p className="titlef">{data.Coverletter}</p>
           </div>
         ))}
          </div>
        </>
     )
    }

