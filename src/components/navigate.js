import React, { useState } from 'react';
import '../App.css';

export default function Nav({ setCurrentContent }) {
    const [activeButton, setActiveButton] = useState('contentCreate');

    const handleButtonClick = (content) => {
        setCurrentContent(content);
        setActiveButton(content);
    };

    return (
        <div className="nav-container"> {/* nav-container */}
            <nav>
                <ul className="nav-list">
                    <li>
                        <button
                            className={activeButton === 'contentCreate' ? 'active' : ''}
                            onClick={() => handleButtonClick('contentCreate')}>Create
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeButton === 'contentEdit' ? 'active' : ''}
                            onClick={() => handleButtonClick('contentEdit')}>Edit
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeButton === 'contentVisual' ? 'active' : ''}
                            onClick={() => handleButtonClick('contentVisual')}>Visual
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeButton === 'contentSearch' ? 'active' : ''}
                            onClick={() => handleButtonClick('contentSearch')}>Search
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
