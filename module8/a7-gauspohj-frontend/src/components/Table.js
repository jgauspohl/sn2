import React from 'react';
import SerialNumber from './Row';

function SerialNumberList({ serialNumbers, onDelete, onEdit }) { // This is a functional component that takes in an array of serial numbers, a function to delete a serial number, and a function to edit a serial number as props
    return (
        <table id="serialNumbers">
            <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Date Purchased</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {serialNumbers.map((serialNumber, i) => <SerialNumber serialNumber={serialNumber} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    ); // This returns a table with a header row and a body row. The body row is mapped to the serialNumbers array and each serialNumber is passed to the SerialNumber component as a prop. The SerialNumber component is imported from the Row.js file. The onDelete and onEdit functions are also passed as props to the SerialNumber component.
} // This component maps over the array of serial numbers and passes each serial number to the SerialNumber component as a prop. It also passes the onDelete and onEdit functions as props to the SerialNumber component

export default SerialNumberList; // This exports the SerialNumberList component
