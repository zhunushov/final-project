import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Cart from './Cart/Cart';
import AddStore from './component/CRUD/AddStore/AddStore';
import EditStore from './component/CRUD/EditStore/EditStore';
import MyNavbar from './MapApi/MyConmponents/MyNavbar/MyNavbar';
import MyContextProvider from './MyContext/MyContext';
import App2  from './MapApi/App2'
import ListPage from './ListPage';
import Fovarites from './Fovarites/Fovarites';
import MyFooter from './Footer/MyFooter';
import Google from './Auth/Google';
import KaruselMainPage from './component/KaruselMainPage/KaruselMainPage';
import Home from './Home/Home';
const MyRoutes = () => {
    
    return (
        <MyContextProvider>
            
        <BrowserRouter>
            <Routes>
            <Route path='/' element={ <Home/> } />  
                <Route path='/fav' element={ <Fovarites />} /> 
                <Route path='google' element={<Google/>} />
                <Route path='/map' element={<App2 />} />
                <Route path="/register" element={<Register/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/add' element={<AddStore />} />
                <Route path='/list' element={<ListPage />} />
                <Route path='/list/edit/:id' element={<EditStore/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/caruselMain' element={<KaruselMainPage/>} />
            </Routes>
            <MyFooter />
        </BrowserRouter>
        </MyContextProvider>
    );
};

export default MyRoutes;    