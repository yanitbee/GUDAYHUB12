import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Freelancerpage from "./pages/freelancerpage";
import Apply from "./pages/apply";
import Employerpage from "./pages/employerpage"
import Freelancerdetails from "./freelancerdetails"
import Write from "./write"
import Taskmanager from "./pages/taskmanager";
import Navbar from "./Navbar";




export default function RouthPath() {
  
 
    return (
      <BrowserRouter  basename={"/GUDAYHUB12"}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/freelancerpage" element={<Freelancerpage />} />
          <Route path="/freelancerpage/Taskmanager" element={<Taskmanager />} />
          <Route path="/freelancerpage/Apply" element={<Apply />} />
          <Route path="/employerpage" element={<Employerpage />} />
          <Route path="/employerpage/Freelancerdetails" element={<Freelancerdetails />} />
          <Route path="/employerpage/Write" element={<Write />} />
        

        </Routes>
      </BrowserRouter>
    );
  }