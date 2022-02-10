import React from 'react';
import { useAuth } from '../Auth/Auth';
import Login from '../Auth/Login';
import Chat from './Chat/Chat';

const App3 = () => {
    const user = useAuth()
    return (
        <>
        {
            user ? <Chat /> : <Login />
        }
        </>
    );
};

export default App3;