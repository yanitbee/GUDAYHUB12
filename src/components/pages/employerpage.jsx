import Navbar from "../Navbar";
import Freelancerlist from "../freelancerlist";
import Employerprofile from "../employerprofile";
import { useLocation } from "react-router-dom";
import Write from "../write";

export default function Employerpage() {
    const location = useLocation();

    const { employerid } = location.state;
    console.log(employerid);

    return (
        <>
            <Employerprofile prop={employerid} />
            <Navbar />
            <Freelancerlist prop={employerid} />
            <Write employerid={employerid} />
        </>
    );
}
