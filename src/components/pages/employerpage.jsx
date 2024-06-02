import Navbar from "../Navbar";
import Write from "../write";
import { useLocation } from "react-router-dom";

export default function Employerpage(){
    
const location = useLocation();
const {employerid} = location.state;
console.log(employerid)

    return(
        <>
        <Navbar/>
       <Write/>
        </>
    )
}