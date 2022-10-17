import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Insurance from "./pages/Insurance";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login/>} />
              <Route path="insurance" element={<Insurance/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
