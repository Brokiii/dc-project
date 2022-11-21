import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Insurance from "./pages/Insurance";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Losses from "./pages/Losses";
import Loss from "./pages/Loss";

function App() {
  return (
      <>
        <BrowserRouter>
        <Navbar />          
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/insurance" element={<Insurance/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/losses" element={<Losses/>} />
            <Route path="/loss" element={<Loss/>} />
            <Route path="*" element={<Home/>} />
          </Routes>
        <Footer />
        </BrowserRouter>
      </>
    );
}

export default App;
