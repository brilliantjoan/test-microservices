// Dependencies
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import config from "../config/config";
import { DataContext } from "../context/DataContext";

const Login = () => {
  const navigate = useNavigate();

  const { setUserData } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const loginClick = async () => {
    setUserData(null);
    removeCookie('token');

    const data = {
      email: email,
      password: password
    }

    // const auth = {
    //   username: "username",
    //   password: "password"
    // }

    // const headers = {
    //   "Access-Control-Allow-Origin": 'http://localhost:3000',
    //   'Content-Type': 'application/json',
    // }

    try {
      let response = await axios.post(config.gatewayUrl + 'auth/login', data)
      if (response.status === 200) {
        setCookie('token', response.data.data.token);
        navigate('/');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response.data.errors) {
        setErrorMessage(error.response.data.errors[0].defaultMessage);
      } else {
        setErrorMessage(error.response.data.message);
      }
    }
  }

  return (
    <div className="login-body">
      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <div className="h3" style={{ fontWeight: 'bold' }}>
              Sign In
            </div>
            <div className="login-input mt-3">
              <div className="mb-1" style={{ fontWeight: 'bold' }}>Email</div>
              <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-input mt-3 pb-1">
              <div className="mb-1" style={{ fontWeight: 'bold' }}>Password</div>
              <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="text-danger text-wrap pb-3" style={errorMessage ? { visibility: 'visible', height: 40 } : { visibility: 'hidden', height: 40 }}>
              {errorMessage}
            </div>
            <div>
              <div className="btn btn-warning w-100" style={{ fontWeight: 'bold' }} onClick={loginClick}>Sign In</div>
            </div>

            <div className="mt-3">
              <div className="d-flex justify-content-center" style={{ color: 'gray', fontSize: 14 }}>
                New to IMDb?
              </div>
              <div className="mt-3">
                <Link to="/signup">
                  <div className="btn btn-light w-100" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Create a New Account</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
