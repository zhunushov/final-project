import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Cart from './Cart/Cart';
import AddStore from './component/CRUD/AddStore/AddStore';
import EditStore from './component/CRUD/EditStore/EditStore';
import MyContextProvider from './MyContext/MyContext';
import App2  from './MapApi/App2'
import ListPage from './ListPage';
import Fovarites from './Fovarites/Fovarites';
import MyFooter from './Footer/MyFooter';
import KaruselMainPage from './component/KaruselMainPage/KaruselMainPage';
import Home from './Home/Home';
import Creditcard from './component/CreditCard/CreditCard';
import App3 from './App3/App3';
import BotTele from './BotTele/BotTele'
const MyRoutes = () => {
    return (
        <MyContextProvider>
        <BrowserRouter>
            <Routes>
            <Route path='/' element={ <Home/> } />  
                <Route path='/fav' element={ <Fovarites />} /> 
                <Route path='/map' element={<App2 />} />
                <Route path="/register" element={<Register/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/add' element={<AddStore />} />
                <Route path='/list' element={<ListPage />} />
                <Route path='/list/edit/:id' element={<EditStore/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/caruselMain' element={<KaruselMainPage/>} />
                <Route path='/credit' element={<Creditcard />} />
                <Route path='/chat' element={<App3 />} />
                <Route path='/bot' element={<BotTele />}/>
            </Routes>
            <MyFooter />
        </BrowserRouter>
        </MyContextProvider>
    );
};

export default MyRoutes;    