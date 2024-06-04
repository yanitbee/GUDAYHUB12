import { useEffect,useState } from "react"
import axios from "axios";
import "./filter.css"



export default function Filter({prop}){
    const [freelancerData, setfreelancerData] = useState({Usertype: null,
        username:null,
        Fullname:null,
        Phonenumber:null,
        Email:null,
        Password:null,
        Gender:null,
        profilepic:null,
        title:null,
        freelancerprofile:{
            profilepic: null,
            title: null,
            skills:null,
            cv:null,
            additionaldoc:{educations : null,
                        certifications: null,},
            gudayhistory:null,
            workhistory:null,
            rating:null,
            description:null,
            portfolio:{link: null,
                         title: null,},
        },});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/freelancerapply/${prop}`)
            setfreelancerData(response.data);
            
          } catch (error) {
            console.error("freelacer error", error);
          }
        };
        fetchData();
      }, []);

    return(
        <>
        
     <label className='menu-icon' htmlFor='menu-btn'>
        <span className='nav-icon'></span>
     </label>
     <div class="sidebar end-0">
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
     </div>
        </>
    )
}