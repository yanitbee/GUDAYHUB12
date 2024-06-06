import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function Posthistory({prop}){
    const [readData, setreadData] = useState([]);
    const [postid,setpostid] =useState("")
    const employerid = "6658e6a1f4c6d6c2720c001e";


    useEffect(() => {
      const fetchData = async () => {
        try {
         await axios.get("http://localhost:5000/reademployerpost" ,{
          params: { employerid: employerid }
        })
            .then((postModel) => setreadData(postModel.data));
            
        } catch (error) {
          console.error("error", error);
        }
      };
      fetchData();
    }, [employerid]);

    
   

    let navigate = useNavigate();

    const handleclick = (postid) => {
        navigate("/employerpage/Applicantsdetails/more", { state: {postid: postid}});
    }

    return(
        <>
     <div className="container">
        {readData.map((data) => (
         <div onClick={() => handleclick(data._id)} className="freelist" >
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