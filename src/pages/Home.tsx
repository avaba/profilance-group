import React from 'react';
import { userName } from '../api/network';

const Home = () => {
    return (
        <>
            <h1>Привет {userName ? userName : "гость"}!</h1>
        </>
    );
};

export default Home;