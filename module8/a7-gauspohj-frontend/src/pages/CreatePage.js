import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

export const CreateSerialNumber = () => {

    const [serial, setSerial] = useState('');
    const [name, setName] = useState(''); 
    const [location, setLocation] = useState('');  
    const [datePurchased, setDatePurchased] = useState('');

    const navigate = useNavigate(); 

    const addSerialNumber = async () => {
        const newSerialNumber = {serial, name, location, datePurchased};
        const response = await fetch(`http://localhost:3001/serialNumbers`, {
            method: 'POST',
            body: JSON.stringify(newSerialNumber),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.status === 201){
            alert("Successfully added the serial number"); 
        } else {
            alert(`Failed to add serial number, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Create Serial Number</h1>
            <h2>The Serial Number Tracker</h2>
            <p>Please add your serial numbers here!</p>
            <input
                type="text"
                placeholder="Serial Number"
                value={serial}
                onChange={e => setSerial(e.target.value)} />
            <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)} />
            <input
                type="date"
                size="10"
                placeholder="01-01-2020"
                value={datePurchased}
                onChange={e => setDatePurchased(e.target.value)} />
                <button onClick={addSerialNumber}><FaSave /> Add Serial Number</button>
        </div>
    );
}

export default CreateSerialNumber;
