import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Home from "./Components/HomePage/Home";
import Login from "./Components/LoginPage/Login";
import Register from "./Components/LoginPage/Register";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
