import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="loginContainer">
        <form>
          <h2>Login</h2>
          <input type="text" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
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
