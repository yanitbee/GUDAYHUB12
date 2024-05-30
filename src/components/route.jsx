import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Freelancerpage from "./pages/freelancerpage";
import Apply from "./pages/apply";



export default function RouthPath() {
    return (
      <BrowserRouter  basename={"/gudayhub1"}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/freelacerpage" element={<Freelancerpage />} />
          <Route path="/freelacerpage/Apply" element={<Apply />} />

        </Routes>
      </BrowserRouter>
    );
  }