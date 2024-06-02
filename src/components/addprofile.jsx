import { useState, useEffect } from 'react';
import axios from 'axios';
import "./addprofile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';




export default function Addprofile(prop){

    const [inputValue, setinputValue] = useState(  {
      title: "",
      skills: [],
      workhistory: "",
      description: "",
      cv: "",
      educations: "",
      certifications: ""
    } )

    const [newSkill, setNewSkill] = useState('');
   

    const handleNewSkillChange = (e) => {
      setNewSkill(e.target.value);
    };
  
    const addSkill = () => {
      if (newSkill.trim() !== '') {
        
        setinputValue({ ...inputValue, skills: [...inputValue.skills, newSkill.trim()] });
        setNewSkill(''); // Clear the input field after adding the skill
        console.log(inputValue.skills)
      }
    };
 
const [showpages,setshowpages] = useState("")

let defalutSkill =["Communication" ,"Computer ", "Leadership ","Management ","Problem-solving ","programming ", "WordPress","Teamwork"  ]
prop.prop.freelancerprofile.skills.forEach((skill) => {
if(defalutSkill.includes(skill)){
  defalutSkill = defalutSkill.filter(item => item !== skill);
}
})
const [skillsdelete, setskillsdelete]= useState([])
const [nskillsdelete, setnskillsdelete]= useState("")


const deletedefalutskill = (skill) =>{
    inputValue.skills = inputValue.skills.filter(item => item !== skill);
    setnskillsdelete("delete")
    console.log( inputValue.skills)
  
}


const shownextpage = () =>{
  setshowpages("active")
}

const showthirdpage = () =>{
  setshowpages("second")
}
const showprepage = () =>{
  setshowpages("")
}
 const openDocument = (value) => {
        window.open(value, "_blank");
      }

      const isEmptyArray = (array) => {
        return array.length === 0;
      };

      const uploadcv = async (e) =>{
        setinputValue({...inputValue, cv: e.target.files[0]});
       
        
    }

    const uploadedu = async (e) =>{
      setinputValue({...inputValue, educations: e.target.files[0]});
       
  }

  const uploadcet= async (e) =>{
    setinputValue({...inputValue, certifications: e.target.files[0]});
}

 

    const remove =() =>{
      if (confirm("changes you have made will be lost")) {
        prop.prop2()
      } else {
        console.log("okay")
      }
    
        
    }



const onsubmit = ()=>{

    editData()
    if(skillsdelete){
      deleteSkill(skillsdelete)
      console.log(skillsdelete)
  
  }
  
}

    const editData = async () => {

        const formData = new FormData();
        if(inputValue.title ){
          formData.append('title', inputValue.title);}
        
      if (inputValue.skills && inputValue.skills.length > 0) {
        inputValue.skills.forEach((skill, index) => {
          formData.append(`skills[${index}]`, skill);
        });
      }
        if(inputValue.workhistory ){
        formData.append('workhistory', inputValue.workhistory);
      }
        if(inputValue.workhistory ){
        formData.append('description', inputValue.description);
      }
        if(inputValue.cv ){
        formData.append('cv', inputValue.cv);
      }
        if(inputValue.educations ){
          formData.append('educationDocs', inputValue.educations);
        }
        if(inputValue.certifications ){
          formData.append('certificationDocs', inputValue.certifications);
        }
        
  

        console.log(inputValue)

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {
         await axios.put(`http://localhost:5000/freelanceredit/${prop.prop._id}`,  formData,
          {  headers: {
          'Content-Type': 'multipart/form-data'
        }})

        } catch (error) {
          console.error("errorr", error);
        }
      };

      const deleteSkill = async (skillToDelete) => {
        try {
          const response = await axios.delete(`http://localhost:5000/freelancerdatadelete/${prop.prop._id}`,   {
            data: { skillToDelete }} );
          
          console.log('Updated freelancer profile:', response.data);
        } catch (error) {
          console.error('Error deleting skill:', error);
        }
      };
      
   



return(
<>
<div className="addpform">
                    <div className="addp-content">
                      <div className={`firstpage${showpages}`}>
                   <div>
                    title 
            <input className="input" type="text" placeholder={prop.prop.freelancerprofile.title ? prop.prop.freelancerprofile.title : "insert your Title"}
             value={inputValue.title}
            onChange={(e) => {setinputValue({...inputValue,title:e.target.value})}}/>
            </div>
            <div className='parent-skill'>
            Your Skills
            <div style={{borderBottom:"solid",margin:"1rem"}}>
            {prop.prop.freelancerprofile.skills.map((skill) => 
        
            <>

               {!skillsdelete.includes(skill) && (
          <>
          <div className='skills'>
           <FontAwesomeIcon className='delete'onClick={() => {  setskillsdelete([...skillsdelete, skill])}} icon={faTrash} /> 
            {skill}
          
            </div>
            </>
          )}

               </> )}
               
               
           { inputValue.skills.map((nskill)=>
           <>
           {nskillsdelete != "delete" && !skillsdelete.includes(nskill) && ( 
           
             <div className='skills'>
             <FontAwesomeIcon className='delete'onClick={() => {deletedefalutskill(nskill)}} icon={faTrash} /> 
                 <>
                  {nskill} </>
                  </div>
                
            )}  </>
               )}
            
            </div>
           
            <input className="input" type="text" placeholder= "Add new skills"
            value={newSkill}
             onChange={handleNewSkillChange}/>

             <FontAwesomeIcon className='add' icon={faPlus} onClick={addSkill} /> 
             
             <br/>
            {defalutSkill.map((dskills) =>
            <>
             {!inputValue.skills.includes(dskills) && (
              <div className='skills'>
               <FontAwesomeIcon className='delete' icon={faPlus} onClick={ () =>{setinputValue({ ...inputValue, skills: [...inputValue.skills, dskills] })}} /> 
              {dskills} </div>
               )}
               </>
            ) } <br/>
            <button className='popup-btn' onClick={shownextpage} >Next</button> 
             </div>
             </div>
             <div className={`secondpage${showpages}`}>
              <div>
            overview
            <textarea style={{height:"100px", width:"650px"}} className="input" type="text" placeholder= {prop.prop.freelancerprofile.description ? prop.prop.freelancerprofile.description : "insert your overview"}
            value={inputValue.description}
              onChange={(e) => {setinputValue({...inputValue, description:e.target.value})}}/> <br />
           
           <div>
            work Experience
            <input className="input" type="text"  placeholder={prop.prop.freelancerprofile.workhistory ? prop.prop.freelancerprofile.workhistory :  "insert your workhistory"}
            value={inputValue.workhistory}
              onChange={(e) => {setinputValue({...inputValue, workhistory:e.target.value})}}/> 
              </div>
           
              <button className='popup-btn' onClick={showprepage} >Back</button>
           <button className='popup-btn' onClick={showthirdpage} >Next</button> 
</div>
            </div>
           
            <div className={`thirdpage${showpages}`}>
              <div>
            CV
            {prop.prop.freelancerprofile.cv  ?
            <button onClick={() => {openDocument(prop.prop.freelancerprofile.cv)}} >your cv</button>
             :null  
            }
            <input  type="file" onChange={uploadcv} /> 
            </div>
            <div>
            additional document 
               educations
            {isEmptyArray(prop.prop.freelancerprofile.additionaldoc.educations)  ?
            null
             :<button onClick={() => {openDocument(prop.prop.freelancerprofile.additionaldoc.educations)}}>Open Word Document</button>  
            }
               <br/>
            <input  type="file" onChange={uploadedu}/> 
            </div>
            <div>
            certifications
            {isEmptyArray(prop.prop.freelancerprofile.additionaldoc.certifications) ?
            null
             :<button onClick={() => {openDocument(prop.prop.freelancerprofile.additionaldoc.certifications)}}>Open Word Document</button>  
            }
               <br/>
            <input  type="file" onChange={uploadcet} /> 
            </div>
            <div>
            portfolio
            {prop.prop.freelancerprofile.portfolio.link  ?
            <button onClick={() => {openDocument(prop.prop.freelancerprofile.cv)}}>Open Word Document</button>
             :null  
            }
             <br/>
             {prop.prop.freelancerprofile.portfolio.title}
            <input  type="file" />
            </div> 
            <button className='popup-btn' onClick={shownextpage} >Back</button>
            <button className='popup-btn' onClick={()=>{onsubmit()}} >Submit</button>
            <button className='popup-btn' id='x'  onClick={remove}>X</button>
            </div>
          </div>
                  </div>
</>
)


}
