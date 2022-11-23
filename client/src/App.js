import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./screens/home/Home";
import Lists from "./screens/list/List";
import Hotel from "./screens/hotel/Hotel";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import AdminHome from "./screens/adminHome/AdminHome";
import AdminList from "./screens/adminList/AdminList";
import New from "./screens/new/New";
import NewRoom from "./screens/newRoom/NewRoom";
import NewHotel from "./screens/newHotel/NewHotel";
import {
  hotelInputs,
  roomInputs,
  userInputs,
} from "./assets/tempData/formDataSource";
import "./assets/styles/darkStyle.scss";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/auth/authContext";
import { DarkModeContext } from "../../client/src/context/darkMode/darkModeContext";
import {
  hotelColumns,
  roomColumns,
  userColumns,
} from "./assets/tempData/datatableSource";
import Search from "./screens/search/Search";

function App() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  // allow only logged in users access pages
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Lists />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/hotels/category" element={<Search />} />
          {user?.isAdmin && (
            <Route path="/admin">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />
              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <AdminList title="Users" columns={userColumns} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <New inputs={userInputs} title="Add New User" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="hotels">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <AdminList columns={hotelColumns} title="Hotels" />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewHotel inputs={hotelInputs} title="Add New Hotel" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="rooms">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <AdminList columns={roomColumns} title="Rooms" room />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewRoom inputs={roomInputs} title="Add New Room" />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          )}

          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
