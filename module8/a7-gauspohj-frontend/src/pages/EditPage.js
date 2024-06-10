import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

export const EditSerialNumber = ({ serialNumberToEdit }) => {

    const [serial, setSerial] = useState(serialNumberToEdit.serial);
    const [name, setName] = useState(serialNumberToEdit.name);
    const [location, setLocation] = useState(serialNumberToEdit.location);
    const [datePurchased, setDatePurchased] = useState(serialNumberToEdit.datePurchased);
    
    const navigate = useNavigate();

    const editSerialNumber = async () => {
        const serialNumberToBeEdited = { serial, name, location, datePurchased };
        const response = await fetch(`/serialNumbers/${serialNumberToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(serialNumberToBeEdited),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            alert("Successfully edited the serial number");
        } else { 
            alert(`Failed to edit serial number, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <div>
            <h2>Edit Serial Number</h2>
            <p>You can edit your serial numbers here</p>
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Date Purchased</th>
                        <th>Save</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    value={serial}
                                    onChange={e => setSerial(e.target.value)} />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)} />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    size="10"
                                    value={datePurchased}
                                    onChange={e => setDatePurchased(e.target.value)} />
                            </td>
                            <td><button onClick={editSerialNumber}> Edit Serial Number <FaEdit /> </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EditSerialNumber;
