import { useEffect,useState } from "react";
import axios from "axios";


export default function Taskmanager(){
  const freelancerid ="6659df336afd090a3ffa956f"
  const [readData,setreadData] = useState([])
    
  useEffect(() => {
    const fetchData = async () => {
      try {
       await axios.get("http://localhost:5000/searchappliedposts" ,{
        params: {freelancerid:freelancerid}})
          .then((ApplicantModel) => setreadData(ApplicantModel.data));
          
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  const isempty = (arr) =>{
    if( arr.length === 0){
    return false;
    }else{
      return true;
    }
  } 

    return(
        <>
<h1>Task Manager</h1>
{isempty(readData) ?
    <div >
       {readData.map((data) => (
         <div  className="freelist" >
             <div>
             <h3 className="textf">Job title </h3>
          <p className="titlef">{data.postid}</p>
          </div>
             <h3 className="textf">Job type </h3>
          <p className="titlef">{data.Jobtype}</p>
          <h3 className="textf">Cover Letter </h3>
          <p className="titlef">{data.Coverletter}</p>
           </div>
         ))}

 </div>
  : 
<div>aaa</div>
  }
   
        </>
    )
}