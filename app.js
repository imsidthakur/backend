const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./config/db');
const employees = require('./routes/employee');
const cors = require('cors');



connectDB();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/employees', employees);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
