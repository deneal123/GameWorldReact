import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo_git from '../assets/logo_git.svg';
import Nav from '../components/navigate';
import CreateContent from '../components/createContent'
import EditContent from '../components/editContent'
import VisualContent from '../components/visualContent'
import SearchContent from '../components/searchContent'
import '../App.css';

export default function Game() {
    const [currentContent, setCurrentContent] = useState('contentCreate');

    const contentData = {
        contentCreate: <CreateContent />,
        contentEdit: <EditContent />,
        contentVisual: <VisualContent />,
        contentSearch: <SearchContent />,
    };

    return (
        <div className="App">
            <header className="App-header Game">
                <Link to="https://github.com/deneal123" className="btn-94 Game git">
                    <img src={logo_git} className="Github" alt="logo" />
                </Link>
                <h1 className="App-header Game title">Created by deneal123</h1>
                <Nav setCurrentContent={setCurrentContent} />
                <Link to="/" className="btn-home">Home</Link>
            </header>
            <hr className="divider" />
            <div className="App-body Game">
                {contentData[currentContent]}
            </div>
        </div>
    );
}
