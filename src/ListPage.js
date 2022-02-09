import React from 'react';
import ListHotels from './component/CRUD/ListHotels/ListHotels';
import KaruselNavigate from './component/Karusel/KaruselNavigate'
import MyNavbar from './MapApi/MyConmponents/MyNavbar/MyNavbar';
const ListPage = () => {
    return (
        <>
        <MyNavbar />
           <KaruselNavigate /> 
           <ListHotels />
        </>
    );
};

export default ListPage;