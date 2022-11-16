import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./screens/home/Home";
import Lists from "./screens/list/List";
import Hotel from "./screens/hotel/Hotel";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/auth/authContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Lists />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
