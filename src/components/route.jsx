import { BrowserRouter, Routes, Route } from "react-router-dom";
import Freelancerpage from "./pages/freelancerpage";
import Apply from "./pages/apply";


export default function RouthPath() {
    return (
      <BrowserRouter  basename={"/gudayhub1"}>
        <Routes>
          <Route path="/" exact element={<Freelancerpage />} />
          <Route path="/Apply" element={<Apply />} />
        </Routes>
      </BrowserRouter>
    );
  }