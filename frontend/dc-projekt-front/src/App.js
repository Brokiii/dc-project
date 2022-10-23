import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Client from "./pages/Client";
import Agent from "./pages/Agent";
import Insurance from "./pages/Insurance";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
      <>
        <BrowserRouter>
        <Navbar />          
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/client" element={<Client/>} />
            <Route path="/agent" element={<Agent/>} />
            <Route path="/insurance" element={<Insurance/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="*" element={<Home/>} />
          </Routes>
        <Footer />
        </BrowserRouter>
      </>
    );
}

export default App;
