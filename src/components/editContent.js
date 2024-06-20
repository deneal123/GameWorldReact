import React, { useState, useEffect } from 'react';
import fetchData from '../Api.js';
import '../App.css';
import moment from 'moment';

export default function EditContent() {
    const [playerId, setPlayerId] = useState('');
    const [name, setName] = useState('');
    const [newname, setNewname] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [weapon, setWeapon] = useState('');
    const [weapon_id, setWeapon_id] = useState('');
    const [weaponsList, setWeaponsList] = useState([]);
    const [class_id, setClass_id] = useState('');
    const [classData, setClassData] = useState({});
    const [playerNotFound, setPlayerNotFound] = useState(false); // New state for player not found

    useEffect(() => {
        const fetchClassesAndArms = async () => {
            try {
                const classes = await fetchData('class', 'GET');
                const classArms = await fetchData('class_arms', 'GET');
                const transformedData = transformClassData(classes, classArms);
                setClassData(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchClassesAndArms();
    }, []);

    const transformClassData = (classes, classArms) => {
        const classData = {};

        if (classes && classes.forEach) {
            classes.forEach((cls) => {
                classData[cls.name.toLowerCase()] = {
                    weapons: [],
                    status: cls.status === 1
                };
            });
        }

        if (classArms && classArms.forEach) {
            classArms.forEach((arm) => {
                const className = arm.class_name.toLowerCase();
                if (classData[className]) {
                    classData[className].weapons.push(arm.arm_name);
                }
            });
        }

        return classData;
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNewNameChange = (event) => {
        setNewname(event.target.value);
    };

    const handleWeaponChange = (event) => {
        setWeapon(event.target.value);
    };

    useEffect(() => {
        const fetchPlayerIdbyName = async () => {
            try {
                const player_id = await fetchData(`players/nickname/${name}`, 'GET');
                setPlayerId(player_id.id);
                setPlayerNotFound(false); // Reset player not found state
                console.log('PlayerId:', player_id);
            } catch (error) {
                console.error('Error fetching player ID:', error);
                setPlayerId('');
                setPlayerNotFound(true); // Player not found, set state to true
            }
        };

        if (name) {
            fetchPlayerIdbyName();
        } else {
            setPlayerId('');
            setPlayerNotFound(false); // Reset state when name is empty
        }
    }, [name]);

    useEffect(() => {
        const fetchClassid = async () => {
            try {
                const id_class = await fetchData(`class/${characterClass}`, 'GET');
                setClass_id(id_class.id);
                console.log('ClassId:', id_class);
            } catch (error) {
                console.error('Error fetching class ID:', error);
            }
        };

        if (characterClass) {
            fetchClassid();
        } else {
            setClass_id('');
        }
    }, [characterClass]);

    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        setCharacterClass(selectedClass);
        if (classData[selectedClass] && classData[selectedClass].status) {
            setWeaponsList(classData[selectedClass].weapons);
            setWeapon('');
        } else {
            setWeaponsList([]);
            setWeapon('');
        }
    };

    useEffect(() => {
        const fetchArmId = async () => {
            try {
                const arm_id = await fetchData(`arms/name/${weapon}`, 'GET');
                setWeapon_id(arm_id.id);
                console.log('ArmId:', arm_id);
            } catch (error) {
                console.error('Error fetching Arm ID:', error);
            }
        };

        if (weapon) {
            fetchArmId();
        } else {
            setWeapon_id('');
        }
    }, [weapon]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedDate = moment().toISOString();

        const updatedPlayer = {
            id: playerId,
            nickname: newname,
            data_registration: formattedDate,
            class_id: class_id
        };

        const updatedPlayerArm = {
            id: playerId,
            player_id: playerId,
            arms_id: weapon_id
        };

        console.log('UpdatedPlayer:', updatedPlayer);
        console.log('UpdatedPlayerArm:', updatedPlayerArm);

        try {
            await fetchData(`players/${playerId}`, 'PUT', updatedPlayer);
            await fetchData(`players_arms/${playerId}`, 'PUT', updatedPlayerArm);
            setName('');
            setNewname('');
            setCharacterClass('');
            setWeapon('');
            setWeapon_id('');
            console.log('Player updated successfully:', updatedPlayer);
            console.log('PlayerArm updated successfully:', updatedPlayerArm);
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };

    return (
        <div className="create-content">
            <h2>Edit Character</h2>
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
                    {playerNotFound && <p className="error-message">Player not found.</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="newname">New Name:</label>
                    <input
                        type="text"
                        id="newname"
                        value={newname}
                        onChange={handleNewNameChange}
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
                        {Object.keys(classData).map((cls) => (
                            <option key={cls} value={cls}>
                                {cls.charAt(0).toUpperCase() + cls.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                {classData[characterClass]?.status && (
                    <div className="form-group">
                        <label htmlFor="weapon">Weapon:</label>
                        <select
                            id="weapon"
                            value={weapon}
                            onChange={handleWeaponChange}
                            required
                        >
                            <option value="">Select Weapon</option>
                            {weaponsList.map((weapon) => (
                                <option key={weapon} value={weapon}>
                                    {weapon}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
