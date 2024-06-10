import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

function SerialNumber({ serialNumber, onDelete, onEdit }) { // This is a functional component that takes in a serial number, a function to delete a serial number, and a function to edit a serial number as props
    return (
        <tr>
            <td>{serialNumber.serial}</td>
            <td>{serialNumber.name}</td>
            <td>{serialNumber.location}</td>
            <td>{serialNumber.datePurchased.substring(0, 10)}</td>
            <td><button className="edit" onClick={() => onEdit(serialNumber)}><FaEdit /></button></td>
            <td><button className="delete" onClick={() => onDelete(serialNumber._id)}><FaTrashAlt /></button></td>
        </tr>
    );
}

export default SerialNumber;
