import Header from "./components/Header"; 
import Footer from "./components/Footer"
import Home from "./pages/Home"
import CarDetail from "./pages/CarDetail";
import Profile from "./pages/Profile";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";


function App() {
  return (
      <AuthProvider>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
