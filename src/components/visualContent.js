import React, { useState, useEffect } from 'react';
import fetchData from '../Api.js';
import '../App.css';

export default function VisualContent() {
    const [selectedTable, setSelectedTable] = useState('');
    const [tableData, setTableData] = useState([]);
    const [tables, setTables] = useState([]);

    // Загружаем список таблиц при монтировании компонента
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const tablesData = await fetchData('tables', 'GET');
                setTables(tablesData);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    // Обработчик смены таблицы
    const handleTableChange = async (event) => {
        const tableName = event.target.value;
        setSelectedTable(tableName);

        try {
            const tableData = await fetchData(`tables/${tableName}`, 'GET');
            setTableData(tableData);
        } catch (error) {
            console.error(`Error fetching data for table ${tableName}:`, error);
        }
    };

    return (
        <div className="visual-content">
            <h2>View Data</h2>
            <form className="table-select-form">
                {tables.map((table) => (
                    <div className="form-group" key={table.table_name}>
                        <label>
                            <input
                                type="radio"
                                value={table.table_name}
                                checked={selectedTable === table.table_name}
                                onChange={handleTableChange}
                            />
                            {table.table_name}
                        </label>
                    </div>
                ))}
            </form>
            <div className="table-data">
                {selectedTable && tableData.length > 0 && (
                    <>
                        <h3>{selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} Data</h3>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(tableData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={index}>
                                        {Object.values(item).map((value, index) => (
                                            <td key={index}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                {selectedTable && tableData.length === 0 && (
                    <p>No data available for {selectedTable}.</p>
                )}
                {!selectedTable && (
                    <p>Select a table to view data.</p>
                )}
            </div>
        </div>
    );
}
