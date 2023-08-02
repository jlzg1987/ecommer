import React from 'react';
import "../styles/loadiningScreen.css";
const LoadingScreen = () => {
    return (

        <div className='container1'>
            <div className='box1'>
                <div className='loader1'><span></span></div>
                <div className='loader1'><span></span></div>
                <div className='load1'>Loading...</div>
                <div className='loader1'><i></i></div>
                <div className='loader1'><i></i></div>
            </div>

        </div>
    );
};

export default LoadingScreen;