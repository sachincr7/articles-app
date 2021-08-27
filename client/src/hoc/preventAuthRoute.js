import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PreventAuthRoute = ({ children }) => {
  const users = useSelector((state) => state.users);
  return <>{users.auth ? <Redirect to="/dashboard" /> : children}</>;
};

export default PreventAuthRoute;
