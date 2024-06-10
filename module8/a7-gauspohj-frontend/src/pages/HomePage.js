import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SerialNumberList from '../components/Table';

function HomePage({ setSerialNumberToEdit }) {
    
    const [serialNumbers, setSerialNumbers] = useState([]); 
    const navigate = useNavigate(); 

    const onDeleteSerialNumber = async _id => { 
        const response = await fetch(`/serialNumbers/${_id}`, {method: 'DELETE'}); 
        if (response.status === 204){ 
            alert("Successfully deleted the serial number");
            setSerialNumbers(serialNumbers.filter(key => key._id !== _id));
        } else { 
            alert(`Failed to delete serial number with _id = ${_id}, status code = ${response.status}`);
            console.log(response); 
        }
    };

    const onEdit = serialNumber => { 
        setSerialNumberToEdit(serialNumber); 
        navigate("/edit"); 
    };

    const loadSerialNumbers = async () => { 
        try {
            const response = await fetch('/serialNumbers'); 
            if (response.ok) {
                const serialNumbers = await response.json(); 
                setSerialNumbers(serialNumbers); 
            } else {
                console.error(`Failed to fetch serial numbers, status code = ${response.status}`);
                const text = await response.text();
                console.log("Response text:", text);
            }
        } catch (error) {
            console.error("Error fetching serial numbers:", error);
        }
    };

    useEffect(() => {loadSerialNumbers();}, []);

    return (
        <>
            <h2>List of Serial Numbers</h2>
            <div className="App-table">
                <h2>The Home Of Serial Numbers!</h2>
                <p>This is a Full Stack MERN Application that tracks your serial numbers here as you input them using the provided interface. </p>
                <SerialNumberList serialNumbers={serialNumbers} onDelete={onDeleteSerialNumber} onEdit={onEdit} />
            </div>
            <div>
                <Link to="/create">Add a serial number</Link>
            </div>
        </>
    );
}

export default HomePage;
