import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    console.log("Username:", userRef.current.value);
    console.log("Password:", passwordRef.current.value);
  
    try {
      const res = await axios.post("http://localhost:5003/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value, // Corrected this line
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
  
      console.log("Response Data:", res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
