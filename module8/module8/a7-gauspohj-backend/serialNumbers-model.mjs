// Models for the Serial Number Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Connection to server failed. Please try again or check your connection.' });
    } else  {
        console.log('Success: MongoDB has been reached using Mongoose!');
    }
});

// SCHEMA: Define the collection's schema.
const serialNumberSchema = mongoose.Schema({
    serial:             { type: String, required: true },
    datePurchased:      { type: Date, required: true },
    description:        { type: String, required: true },
    value:              { type: Number, required: true, min:[0, "Item cannot be worthless."] }
});

// Compile the model from the schema 
// by defining the collection name "serialNumbers".
const serialNumbers = mongoose.model('Serial Numbers', serialNumberSchema);

// CREATE model *****************************************
const createSerialNumber = async (serial, datePurchased, description, value) => {
    const serialNumber = new serialNumbers({ 
        serial: serial, 
        datePurchased: datePurchased, 
        description: description,
        value: value 
    });
    return serialNumber.save();
}

// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveSerialNumbers = async () => {
    const query = serialNumbers.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveSerialNumberByID = async (_id) => {
    const query = serialNumbers.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteSerialNumberById = async (_id) => {
    const result = await serialNumbers.deleteOne({_id: _id});
    return result.deletedCount;
};

// UPDATE model *****************************************************
const updateSerialNumber = async (_id, serial, datePurchased, description, value) => {
    const result = await serialNumbers.replaceOne({_id: _id }, {
        serial: serial,
        datePurchased: datePurchased,
        description: description,
        value: value
    });
    return { 
        _id: _id, 
        serial: serial,
        datePurchased: datePurchased,
        description: description,
        value: value
    }
}

// EXPORT the variables for use in the controller file.
export { createSerialNumber, retrieveSerialNumbers, retrieveSerialNumberByID, updateSerialNumber, deleteSerialNumberById }
