import { BrowserRouter, Routes, Route } from "react-router-dom";
import Freelancerpage from "./pages/freelancerpage";
import Apply from "./pages/apply";
import Write from "./write";
import Home from "./pages/Home"
import Employerpage from "./pages/employerpage"


export default function RouthPath() {
    return (
      <BrowserRouter  basename={"/gudayhub1"}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/freelancerpage" element={<Freelancerpage />} />
          <Route path="/freelancerpage/Apply" element={<Apply />} />
          <Route path="/employerpage" element={<Employerpage />} />
        </Routes>
      </BrowserRouter>
    );
  }