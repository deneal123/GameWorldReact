import React, { useState, useEffect } from 'react';
import fetchData from '../Api.js';
import '../App.css';
import moment from 'moment';



export default function CreateContent() {
    const [name, setName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [num, setNum] = useState('');
    const [class_id, setClass_id] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleClassChange = (event) => {
        setCharacterClass(event.target.value);
    };

    // Получаем айди нового пользователя
    useEffect(() => {
        const fetchNum = async () => {
            try {
                const players = await fetchData('players', 'GET');
                setNum(players.length+1);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchNum();
    }, []);

    // Получаем айди класса
    useEffect(() => {
        const fetchClassid = async () => {
            try {
                const id_class = await fetchData(`class/${characterClass}`, 'GET');
                setClass_id(id_class.id); // Предполагая, что сервер возвращает объект с полем 'id'
            } catch (error) {
                console.error('Error fetching id class:', error);
            }
        };

        if (characterClass) {
            fetchClassid();
        } else {
            setClass_id(''); // Если characterClass пустой, сбросить class_id
        }
    }, [characterClass]);

    // Отправка данных о новом пользователе
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Получение текущей даты в нужном формате
        const formattedDate = moment().toISOString(); // "2024-06-20T12:07:10.045Z"

        // Подготовка данных для отправки
        const newPlayer = {
            id: num,
            nickname: name,
            data_registration: formattedDate,
            class_id: class_id
        };

        try {
            // Вызов функции fetchData для отправки POST запроса
            await fetchData(`players`, 'POST', newPlayer);

            // Очистка полей после успешной отправки
            setName('');
            setCharacterClass('');
        } catch (error) {
            console.error('Error creating new user:', error);
        }
    };

    return (
        <div className="create-content">
            <h2>Create Character</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class:</label>
                    <select
                        id="class"
                        value={characterClass}
                        onChange={handleClassChange}
                        required
                    >
                        <option value="">Select Class</option>
                        <option value="Warrior">Warrior</option>
                        <option value="Mage">Mage</option>
                        <option value="Archer">Archer</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Priest">Priest</option>
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );

}