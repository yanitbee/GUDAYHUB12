import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function Applicantsdetails({prop}){
    const [readData, setreadData] = useState([]);
    const [filter,setsearch] = useState("")
    const [postid,setpostid] =useState("")
    const employerid = "6658e6a1f4c6d6c2720c001e";


    useEffect(() => {
      const fetchData = async () => {
        try {
         await axios.get("http://localhost:5000/readjobapplicant" ,{
          params: { employerid: employerid }
        })
            .then((postModel) => setreadData(postModel.data));
            
        } catch (error) {
          console.error("error", error);
        }
      };
      fetchData();
    }, []);
    console.log("employer ID:", employerid);
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:5000/readapplicant")
          .then((ApplicantModel) => setreadData(ApplicantModel.data));
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);
  const handlesetpostid = (type)=>{
    setpostid( type)

  }
  const handlejobtyped =()=>{
    setpostid("")
  }
  console.log("Post ID:", postid);

  useEffect(() => {
    const fetchData = async () => {
      try {
       await axios.get("http://localhost:5000/readapplicant" ,{
        params: {id:{postid}}})
          .then((ApplicantModel) => setreadData(ApplicantModel.data));
          
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

    let navigate = useNavigate();

    const handleclick = (postid) => {
        navigate("", { state: {postid: postid ,freelancerid:prop}});}

       /// const filteredData = readData.filter((data) => data.postid === "postid");

    return(
        <>
             {readData.map((data) => (
        <div>
          <h3>{data.Jobtitle}</h3>
          <p>{data.Jobtype}</p>
        </div>
      ))}
     <div className="container">
        {readData.map((data) => (
         <div onClick={() => handleclick(data._id)} className="freelist" >
             <div>
             <h3 className="textf">Fullname </h3>
          <p className="titlef">{data.Fullname}</p>
          </div>
             <h3 className="textf">Phonenumber </h3>
          <p className="titlef">{data.Phonenumber}</p>
          <h3 className="textf">Cover Letter </h3>
          <p className="titlef">{data.Coverletter}</p>
           </div>
         ))}
          </div>
        </>
     )
    }