import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch, loading } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const res = axios.post("http://localhost:8800/api/auth/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error });
    }
  };
  return (
    <div className="login">
      <div className="loginContainer">
        <form>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button disabled={loading} onClick={(e) => handleLogin(e)}>
            Login
          </button>
          <span style={{ textAlign: "center" }}>
            Dont't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span className="secondBtn">Register</span>
            </Link>
          </span>
          <Link to="/" style={{ textAlign: "center", textDecoration: "none" }}>
            <span className="secondBtn">Go to home</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
