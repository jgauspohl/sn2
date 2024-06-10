// Controllers for the Serial Number Collection

import 'dotenv/config';
import express from 'express';
import * as serialNumbers from './serialNumbers-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.

// CREATE controller ******************************************
app.post('/serialNumbers', (req, res) => {
    serialNumbers.createSerialNumber(
        req.body.serial, 
        req.body.datePurchased, 
        req.body.description,
        req.body.value
    )
    .then(serialNumber => {
        console.log(`Serial number "${serialNumber.serial}" was added to the collection.`);
        res.status(201).json(serialNumber);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Failed to create the serial number.' });
    });
});

// RETRIEVE controller ****************************************************
app.get('/serialNumbers', (req, res) => {
    serialNumbers.retrieveSerialNumbers()
        .then(serialNumbers => { 
            if (serialNumbers !== null) {
                console.log(`All serial numbers were retrieved from the collection.`);
                res.json(serialNumbers);
            } else {
                res.status(404).json({ Error: 'No serial numbers found in the collection.' });
            }         
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Failed to retrieve serial numbers.' });
        });
});

// RETRIEVE by ID controller
app.get('/serialNumbers/:_id', (req, res) => {
    serialNumbers.retrieveSerialNumberByID(req.params._id)
    .then(serialNumber => { 
        if (serialNumber !== null) {
            console.log(`Serial number "${serialNumber.serial}" was retrieved, based on its ID.`);
            res.json(serialNumber);
        } else {
            res.status(404).json({ Error: 'Serial number not found with the provided ID.' });
        }         
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Failed to retrieve the serial number by ID.' });
    });
});

// UPDATE controller ************************************
app.put('/serialNumbers/:_id', (req, res) => {
    serialNumbers.updateSerialNumber(
        req.params._id, 
        req.body.serial, 
        req.body.datePurchased, 
        req.body.description,
        req.body.value
    )
    .then(serialNumber => {
        console.log(`Serial number "${serialNumber.serial}" was updated.`);
        res.json(serialNumber);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Failed to update the serial number.' });
    });
});

// DELETE Controller ******************************
app.delete('/serialNumbers/:_id', (req, res) => {
    serialNumbers.deleteSerialNumberById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} serial number was deleted.`);
                res.status(200).send({ Success: 'Serial number deleted successfully.' });
            } else {
                res.status(404).json({ Error: 'Serial number not found with the provided ID.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Failed to delete the serial number.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
