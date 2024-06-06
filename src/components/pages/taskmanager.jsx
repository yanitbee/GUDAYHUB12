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
<>
{data.postid}
{data.Coverletter}
</>
))}
 </div>
  : 
<div>aaa</div>
  }
   
        </>
    )
}