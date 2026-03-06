import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kabilan_292803',
  database: 'students-task-manager',
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
    connection.release();
  }
});

app.post('/register', (req, res) => {
  const { name, roll_number, department, year } = req.body;

  if (!name?.trim() || !roll_number?.trim() || !department?.trim() || !year) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.'
    });
  }

  const query = `
    INSERT INTO students (name, roll_number, department, year)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, roll_number, department, year], (err) => {

    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Roll number already exists.'
        });
      }

      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Database error'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Student registered successfully'
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

