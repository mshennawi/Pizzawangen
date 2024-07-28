/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({element: Component,isAllowed,redirectPath}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }
  return(
     <Component />
    );
};
