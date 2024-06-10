import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateSerialNumber from './pages/CreatePage';
import EditSerialNumber from './pages/EditPage';
import Navigation from './components/Navigation';

function App() {
  const [serialNumberToEdit, setSerialNumberToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
          <h1>Serial Number Collection & Tracking Application</h1>
          <p>Application that assists in tracking serial numbers. Please add/create serial numbers and then edit them as you see fit!</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage setSerialNumberToEdit={setSerialNumberToEdit} />} />
            <Route path="/create" element={<CreateSerialNumber />} />
            <Route path="/edit" element={<EditSerialNumber serialNumberToEdit={serialNumberToEdit} />} />
          </Routes>
        </main>
        <footer> &copy; 2022 Sean Madden</footer>
      </Router>
    </div>
  );
}

export default App;
