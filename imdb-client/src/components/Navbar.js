import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';

import { DataContext } from "../context/DataContext";
import config from "../config/config";

function Navbar() {
  const { userData, setUserData } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  useEffect(() => {
    if (isEmpty(userData) && !isEmpty(cookies.token)) {
      getUserData(cookies.token)
    }
  }, [cookies.token, location.pathname])

  const getUserData = async (token) => {
    // const auth = {
    //   username: "username",
    //   password: "password"
    // }
    const headers = {
      "Authorization": "Bearer " + cookies.token
    }
    try {
      let response = await axios.get(config.gatewayUrl + 'auth/authenticate', { headers })
      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 500 && error.response.data.message.substring(0, 11) === "JWT expired") {
        setUserData(null);
        removeCookie('token');
        navigate("/login");
      } else if (error.response.status === 401) {
        setUserData(null);
        removeCookie('token');
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    if (isSearching === false && search) {
      setTimeout(() => {
        setIsSearching(true)
        searchMovie()
      }, 1000)
    }

    if (isEmpty(search)) {
      setSearchResult([]);
    }
  }, [search])

  const searchMovie = async () => {
    let response = await axios.get(config.gatewayUrl + 'movie/search?title=' + search)
    if (response.status === 200) {
      setSearchResult(response.data.data);
      setIsSearching(false)
    }
  }

  const logoutClick = () => {
    removeCookie('token');
    setUserData(null);
  }

  const openProfileDropdown = () => {
    return (
      <div className="profile-modal" onClick={() => setOpenProfileMenu(false)}>
        <div style={{ position: 'absolute', backgroundColor: '#1f1f1f', color: 'white', width: '100%', marginTop: 10 }}>
          <Link to={"/movielist"} className="text-decoration-none" style={{ color: 'white' }} >
            <div className="p-3">
              Movie List
            </div>
          </Link>
          <div style={{ borderBottom: '1px solid white' }} />
          <div className="p-3" style={{ cursor: 'pointer' }} onClick={logoutClick}>
            Logout
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="nav">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <div className="h4" style={{ marginBottom: 0, color: 'orange', fontWeight: 'bold' }}>
            IMDb
          </div>
        </Link>
        <div className="px-5" style={{ width: '70%', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by movie title"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
          <div style={{ position: 'absolute', backgroundColor: 'white', color: 'black', width: '90%' }}>
            {searchResult && searchResult.map((movie) => {
              return (
                <Link to={"/movie/" + movie.id} className="text-decoration-none" style={{ color: 'black' }} onClick={() => { setSearch(""); setSearchResult([]); }}>
                  <div className="m-2">
                    {movie.title}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        {userData
          ? <div style={{ position: 'relative', width: 110 }}>
            <div style={{ cursor: 'pointer', color: 'white' }} onClick={() => setOpenProfileMenu(!openProfileMenu)}>
              Hi, {userData.username}
            </div>
            {openProfileMenu && openProfileDropdown()}
          </div>
          : <Link to="/login" className="text-decoration-none" style={{ cursor: 'pointer', color: 'white' }}>
            <div>
              Login
            </div>
          </Link>}
      </div>
    </div>
  );
}

export default Navbar;
