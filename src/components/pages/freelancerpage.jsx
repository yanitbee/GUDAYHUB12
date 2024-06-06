import Navbar from "../Navbar";
import Joblist from "../joblist";
import Taskmanager from "./taskmanager";
import Frelancerprofile from "../freelancerprofile";
import { useLocation } from "react-router-dom";


export default function Freelancerpage(){

const location = useLocation()

const {freelancerid}=location.state

    return(
        <>

 <Navbar />
 <Frelancerprofile prop={freelancerid}/>
 
 <Joblist prop={freelancerid}/>
 
        </>
    )
}