import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../App.css';


export default function Home() {

    return (
        <div className="App">
            <body className="App-body home">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/menu" className="btn-42 menu-button">Welcome to the RatCity!</Link>
            </body>
        </div>
    );
}