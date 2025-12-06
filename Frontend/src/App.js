import Header from "./components/Header"; 
import Footer from "./components/Footer"
import Home from "./pages/Home"
import CarDetail from "./pages/CarDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarDetail />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
