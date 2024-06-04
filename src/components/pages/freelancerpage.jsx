import Navbar from "../Navbar";
import Joblist from "../joblist";

import Frelancerprofile from "../freelancerprofile";
import { useLocation } from "react-router-dom";


export default function Freelancerpage(){

const location = useLocation()

const {freelancerid}=location.state

    return(
        <>
<Frelancerprofile prop={freelancerid}/>
 <Navbar/>
 
 <Joblist prop={freelancerid}/>
 
        </>
    )
}