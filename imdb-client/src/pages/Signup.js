// Dependencies
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import config from "../config/config";
import { DataContext } from "../context/DataContext";

const Signup = () => {
  const navigate = useNavigate();

  const { setUserData } = useContext(DataContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const signupClick = async () => {
    setUserData(null);
    removeCookie('token');

    const data = {
      username: username,
      email: email,
      password: password
    }

    try {
      let response = await axios.post(config.gatewayUrl + 'auth/register', data)
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
              Create Account
            </div>
            <div className="login-input mt-3">
              <div className="mb-1" style={{ fontWeight: 'bold' }}>Username</div>
              <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="login-input mt-3">
              <div className="mb-1" style={{ fontWeight: 'bold' }}>Email</div>
              <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-input mt-3">
              <div className="mb-1" style={{ fontWeight: 'bold' }}>Password</div>
              <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="text-danger text-wrap pb-3" style={errorMessage ? { visibility: 'visible', height: 40 } : { visibility: 'hidden', height: 40 }}>
              {errorMessage}
            </div>
            <div className="btn btn-warning w-100" style={{ fontWeight: 'bold' }} onClick={signupClick}>Create your IMDb account</div>
            <div className="mt-3 d-flex" style={{ fontSize: 14 }}>
              <div>Already have an account? </div>
              <Link to="/login" style={{ marginLeft: 5 }}>
                Sign in
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
