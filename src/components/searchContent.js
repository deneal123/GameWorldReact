import React, { useState } from 'react';
import '../App.css';
import fetchData from '../Api.js';

export default function SearchContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            // ���������� ������ �� ������ � ��������� ��������
            const results = await fetchData(`search?query=${searchQuery}`, 'GET');
            setSearchResults(results); // ������������� ���������� ������ � ���������
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value); // ��������� ��������� ��� ��������� �����
    };

    return (
        <div className="create-content">
            <h2>Search</h2>
            <div className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Enter search query"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                <h3>Search Results</h3>
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.id}>
                            {result.name} {/* ������ ������ ��������� ������ */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
