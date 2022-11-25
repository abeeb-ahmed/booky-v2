import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/auth/authContext";
import "./register.css";

const Register = () => {
  const { dispatch, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  // handle sign up and dispatch auth context
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      dispatch({ type: "LOGIN_START" });
      if ((username, email, password, confirmPassword, country, city)) {
        const res = await axios.post(
          "https://booky-web-api.onrender.com/api/auth/register",
          {
            username,
            email,
            password,
            confirmPassword,
            country,
            city,
            phone,
          }
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        console.log(res.data);
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error });
    }
  };

  return (
    <div className="register">
      <div className="registerContainer">
        <form>
          <h2>Sign up</h2>
          <div className="registerWrapper">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button disabled={loading} onClick={(e) => handleSignup(e)}>
            Sign Up
          </button>
          <span style={{ textAlign: "center" }}>
            Already have an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="secondBtn"> Login</span>
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

export default Register;
