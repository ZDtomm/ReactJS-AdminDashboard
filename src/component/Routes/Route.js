import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../../pages/views/DashboardPage';
import RestaurantPage from '../../pages/views/RestaurantPage';
import TableMeja from '../../pages/views/TablesPage';
import Login from '../../pages/views/Login';
import PrivateRoute from '../private route/PrivateRoute';
import '../../App.css'
import Register from '../../pages/views/Register';
import Category from '../../pages/views/Category';
import MenuPage from '../../pages/views/Menu';
import Reservation from '../../pages/views/Reservation';

function RouteJs() {

    return (  
        <div className='page-content'>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/dashboard' element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
            <Route path='/restaurant' element={<PrivateRoute><RestaurantPage/></PrivateRoute>}/>
            <Route path='/tables' element={<PrivateRoute><TableMeja/></PrivateRoute>}/>
            <Route path='/category' element={<PrivateRoute><Category/></PrivateRoute>}/>
            <Route path='/menu' element={<PrivateRoute><MenuPage/></PrivateRoute>}/>
            <Route path='/reservation' element={<PrivateRoute><Reservation/></PrivateRoute>}/>
        </Routes>
        </div>
    );
}

export default RouteJs;
