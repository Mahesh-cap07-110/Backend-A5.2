const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup morgan logger
morgan.token('content-length', (req, res) => {
    return res.getHeader('content-length');
});

app.use(morgan(':method :url :status :content-length - :response-time ms :date[web] HTTP/:http-version', { stream: accessLogStream }));

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Express');
});

app.get('/get-users', (req, res) => {
    res.status(200).json({ users: ['user1', 'user2', 'user3'] });
});

app.post('/add-user', (req, res) => {
    res.status(201).json({ message: 'User added successfully' });
});

app.put('/user/:id', (req, res) => {
    res.status(201).json({ message: `User ${req.params.id} updated successfully` });
});

app.delete('/user/:id', (req, res) => {
    res.status(200).json({ message: `User ${req.params.id} deleted successfully` });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});