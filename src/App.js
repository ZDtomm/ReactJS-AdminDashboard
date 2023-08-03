import React from 'react';
import Navbar from './component/NavBar/Navbar';
import RouteJs from './component/Routes/Route';
import Sidebar from './component/SideBar/Sidebar';
import { useSelector } from 'react-redux';
import './App.css';


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className="container-app">
      {isLoggedIn ? <Navbar/> : null}
      <div className='container-content'>
      {isLoggedIn ? <Sidebar/> : null}
      </div>
      <RouteJs/>
    </div>
  );
}

export default App;

