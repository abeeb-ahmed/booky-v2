import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/home/Home";
import Lists from "./screens/list/List";
import Hotel from "./screens/hotel/Hotel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Lists />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
