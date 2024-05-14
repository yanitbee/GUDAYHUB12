import { useState } from "react";
import axios from "axios";

export default function Write(){
    const [inputValue, setinputValue] = useState({Jobtype: '', Jobtitle:'', Description:"", Qualification:"", PostedDate:"", Deadline:"", Salary:"", Contact:"", location:"", urgency:""});

    const saveData = async () => {
    try{
        await axios.post("http://localhost:5000/writepost", {Jobtype: inputValue.Jobtype,Jobtitle: inputValue.Jobtitle, Description: inputValue.Description, Qualification: inputValue.Qualification, PostedDate: inputValue.PostedDate, Deadline: inputValue.Deadline, Salary: inputValue.Salary, Contact: inputValue.Contact, location: inputValue.location, urgency: inputValue.urgency })
        console.log("data: ", inputValue)
    } catch(error){
        console.log("errorr", error)
    }
    }
    return(
        <>
        <div>
            <input style={{border:"solid"}}  placeholder= "Jobtype" type="string" value={inputValue.Jobtype}
            onChange={e => setinputValue({ ...inputValue, Jobtype: e.target.value}) }/>
            </div>
            <div>
             <input style={{border:"solid"}} placeholder= "Jobtitle" type="string" value={inputValue.Jobtitle}
            onChange={e => setinputValue({ ...inputValue, Jobtitle: e.target.value}) }/>
             </div>
             <div>
             <input style={{border:"solid"}} placeholder= "Description" type="string" value={inputValue.Description}
            onChange={e => setinputValue({ ...inputValue, Description: e.target.value}) }/>
             </div>
             <div>
             <input style={{border:"solid"}} placeholder= "Qualification" type="string" value={inputValue.Qualification}
            onChange={e => setinputValue({ ...inputValue, Qualification: e.target.value}) }/>
</div>
<div>
             <input style={{border:"solid"}} placeholder= "PostedDate" type="string" value={inputValue.PostedDate}
            onChange={e => setinputValue({ ...inputValue, PostedDate: e.target.value}) }/>
</div>
<div>
             <input style={{border:"solid"}} placeholder= "Deadline" type="string" value={inputValue.Deadline}
            onChange={e => setinputValue({ ...inputValue, Deadline: e.target.value}) }/>
            </div>
            <div>
             <input style={{border:"solid"}} placeholder= "Salary" type="string" value={inputValue.Salary}
            onChange={e => setinputValue({ ...inputValue, Salary: e.target.value}) }/>
            <div>
             <input style={{border:"solid"}} placeholder= "Contact" type="string" value={inputValue.Contact}
            onChange={e => setinputValue({ ...inputValue, Contact: e.target.value}) }/>
            </div>
            <div>
             <input style={{border:"solid"}} placeholder= "location" type="string" value={inputValue.location}
            onChange={e => setinputValue({ ...inputValue, location: e.target.value}) }/>
            </div>
            <div>
             <input style={{border:"solid"}} placeholder= "urgency" type="string" value={inputValue.urgency}
            onChange={e => setinputValue({ ...inputValue, urgency: e.target.value}) }/>
            </div>
            <button onClick={saveData}>save</button>
            </div>
            </>
    )
}