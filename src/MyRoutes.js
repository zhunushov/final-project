import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AddStore from './component/CRUD/AddStore/AddStore';
import EditStore from './component/CRUD/EditStore/EditStore';
import ListStore from './component/CRUD/ListStore/ListStore';
import MyContextProvider from './MyContext/MyContext';
// import MyNavbar from './MyNavbar/MyNavbar'

const MyRoutes = () => {
    return (
        <MyContextProvider>
        <BrowserRouter>
           {/* <MyNavbar/> */}
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/add' element={<AddStore />} />
                <Route path='/list' element={<ListStore />} />
                <Route path='/list/edit/:id' element={<EditStore/>} />
            </Routes>
        </BrowserRouter>
        </MyContextProvider>
    );
};

export default MyRoutes;