import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

import { DataContext } from "../context/DataContext";
import { isEmpty } from "lodash";

function PrivateRoute({ component: Component, ...rest }) {
  const { userData } = useContext(DataContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isEmpty(userData)) {
  //     navigate('/login');
  //   }
  // }, [])

  return userData ? <Component /> : <Navigate to="/login" />

}

export default PrivateRoute;
