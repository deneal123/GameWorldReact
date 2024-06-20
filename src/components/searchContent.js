import React, { useState } from 'react';
import '../App.css';
import fetchData from '../Api.js';

export default function SearchContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            // Отправляем запрос на сервер с поисковым запросом
            const results = await fetchData(`search?query=${searchQuery}`, 'GET');
            setSearchResults(results); // Устанавливаем результаты поиска в состояние
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value); // Обновляем состояние при изменении ввода
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
                            {result.name} {/* Пример вывода найденных данных */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
