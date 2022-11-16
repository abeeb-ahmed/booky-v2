import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/home/Home";
import Lists from "./screens/list/List";
import Hotel from "./screens/hotel/Hotel";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Lists />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
