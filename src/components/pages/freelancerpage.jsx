import Navbar from "../Navbar";
import Joblist from "../joblist";
import Frelancerprofile from "../freelancerprofile";


export default function Freelancerpage(){

    let freelancerid = "66421e4c0c979c1c4a5b4919" 

    return(
        <>
<Frelancerprofile prop={freelancerid}/>
 <Navbar/>
 <Joblist prop={freelancerid}/>
        </>
    )
}