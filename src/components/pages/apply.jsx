import { useLocation } from "react-router-dom";



export default function Apply(){

    const location = useLocation();
    const state = location.state;
    console.log(state)
    return(
        <>
        <div>
            <h2>a</h2>
        </div>
        </>
    )
}