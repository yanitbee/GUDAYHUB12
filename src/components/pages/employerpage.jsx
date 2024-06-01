import Navbar from "../Navbar";
import Write from "../write";
import Freelancerlist from "../freelancerlist";
import Employerprofile from "../employerprofile";
import { useLocation } from "react-router-dom";

export default function Employerpage(){
    const location = useLocation()

    const {employerid}=location.state
    console.log(employerid)

    return(
        <>
        <Employerprofile prop={employerid}/>
        <Navbar/>
       <Freelancerlist prop={employerid}/>
        </>
    )
}