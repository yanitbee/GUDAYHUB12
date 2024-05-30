import Navbar from "../Navbar";
import Joblist from "../joblist";
import Frelancerprofile from "../freelancerprofile";
import { useLocation } from "react-router-dom";


export default function Freelancerpage(){

const location = useLocation()

const {freelacerid}=location.state
console.log(freelacerid)

    return(
        <>
<Frelancerprofile prop={freelacerid}/>
 <Navbar/>
 <Joblist prop={freelacerid}/>
        </>
    )
}