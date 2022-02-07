import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Cart from './Cart/Cart';
import AddStore from './component/CRUD/AddStore/AddStore';
import EditStore from './component/CRUD/EditStore/EditStore';
import ListStore from './component/CRUD/ListStore/ListStore';
import MyNavbar from './MapApi/MyConmponents/MyNavbar/MyNavbar';
import MyContextProvider from './MyContext/MyContext';

const MyRoutes = () => {
    
    return (
        <MyContextProvider>
        <BrowserRouter>
           <MyNavbar/>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/add' element={<AddStore />} />
                <Route path='/list' element={<ListStore />} />
                <Route path='/list/edit/:id' element={<EditStore/>} />
                <Route path='/cart' element={<Cart/>} />
            </Routes>
        </BrowserRouter>
        </MyContextProvider>
    );
};

export default MyRoutes;