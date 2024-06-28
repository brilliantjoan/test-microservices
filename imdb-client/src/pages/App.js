// Dependencies
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { CookiesProvider } from 'react-cookie';

import '../App.css';

// Pages
import Home from "./Home";
import Navbar from "../components/Navbar";
import MovieDetail from "./MovieDetail";
import Login from "./Login";
import Signup from "./Signup";
import MovieListDashboard from "./MovieListDashboard";
import PrivateRoute from "../components/PrivateRoute";

import { DataContextProvider } from "../context/DataContext";

const RouteList = () => {
  return (
    <div>
      <CookiesProvider>
        <Navbar />
        <Routes>
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<PrivateRoute component={<Home />} />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="/movielist" element={<MovieListDashboard />} />

        </Routes>
      </CookiesProvider>
    </div>
  );
};

function App() {
  return (
    <Router>
      <DataContextProvider>
        <RouteList />
      </DataContextProvider>
    </Router>
  );
}

export default App;
