import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Game from './pages/GamePage';


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Game />} />
            </Routes>
        </Router>
    );
}

export default App;
