import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config({ path: 'server.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the schema and model
const serialNumberSchema = new mongoose.Schema({
  serial: String,
  description: String,
  datePurchased: Date
});

const SerialNumber = mongoose.model('SerialNumber', serialNumberSchema);

// Routes
app.get('/serialNumbers', async (req, res) => {
  try {
    const serialNumbers = await SerialNumber.find();
    res.send(serialNumbers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/serialNumbers', async (req, res) => {
  try {
    const newSerialNumber = new SerialNumber(req.body);
    await newSerialNumber.save();
    res.status(201).send(newSerialNumber);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/serialNumbers/:id', async (req, res) => {
  try {
    const serialNumber = await SerialNumber.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(serialNumber);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/serialNumbers/:id', async (req, res) => {
  try {
    await SerialNumber.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
