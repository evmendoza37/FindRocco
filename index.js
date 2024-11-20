var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var db = mysql.createConnection({
    host: "localhost",
    user: "emily",
    password: "evm232837",
    database: 'geo_cache'
});

db.connect( (err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID' + db.threadId);
});

app.get('/api/visitors', (req, res) => {
    db.query('SELECT * FROM Visitors', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fethcing users');
        }
        res.json(results);
    });
});

// Create a new user
app.post('/api/visitors', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO Visitors (name) VALUES (?)', [name], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(400).send('Error logging visitor');
        return;
      }
      res.status(201).send('Visitor logged successfully');
    });
  });


//Start the server
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})