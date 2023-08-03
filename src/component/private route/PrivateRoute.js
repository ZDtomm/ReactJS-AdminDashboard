import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const location = useLocation();

  // kalo belom login akan di arahkan ke /login
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" state={{ fromPath: location.pathname }}/>
  }
  // kalo udah langsung bisa akses route yang dituju
  return children
}

export default PrivateRoute