import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./freelancerlist.css"

export default function Freelancerlist({prop}){
    const [readData, setreadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:5000/readfromserver")
          .then((datamodal) => setreadData(datamodal.data));
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

    let navigate = useNavigate();

    const handleclick = (userid) => {
        navigate("Freelancerdetails", { state: {userid: userid ,employerid:prop}});}

        const filteredData = readData.filter((data) => data.Usertype === "freelancer");

    return(
        <>
     <div className="container">
        {filteredData.map((data) => (
         <div onClick={() => handleclick(data._id)} className="freelist" >
             <div>
             <img className="ppf" src={`${process.env.PUBLIC_URL}${data.profilepic}`} />
             <h3 className="textf">Name </h3>
          <p className="titlef">{data.Fullname}</p>
          </div>
             <h3 className="textf">Username </h3>
          <p className="titlef">{data.username}</p>
          <h3 className="textf">Email </h3>
          <p className="titlef">{data.Email}</p>
           </div>
         ))}
          </div>
        </>
     )
    }