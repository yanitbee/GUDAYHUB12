import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./joblist.css" 

export default function Joblist({prop}){
    const [readData, setreadData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
         axios .get("http://localhost:5000/readpost")
            .then((postModel) => setreadData(postModel.data));
        } catch (error) {
          console.error("error", error);
        }
      };
      fetchData();
    }, []);

    let navigate = useNavigate();

    const handleclick = (postid) => {
        navigate("Apply", { state: {postid: postid ,freelancerid:prop}});}

    return(
       <>
    <div >
       {readData.map((data) => (
        <div onClick={() => handleclick(data._id)} className="postblock">
          <img className="employer" src={`${process.env.PUBLIC_URL}${data.employer}`}/>
            <div>
            <h3 className="text">Job Type </h3>
         <p className="title">{data.Jobtype}</p>
         </div>
            <h3 className="text">Job Title </h3>
         <p className="title">{data.Jobtitle}</p>
         <h3 className="text">Location </h3>
         <p className="title">{data.location}</p>
          </div>
        ))}
         </div>
       </>
    )
}