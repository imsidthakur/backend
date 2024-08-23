const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const Employee = require('../models/Employee'); 

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    const insertedEmployees = [];

    for (const row of data) {
      const { empId, name, designation, email, phone, gender } = row;
      let employee = await Employee.findOne({ empId });

    //   if (employee) {
    //     continue; // Skip if employee already exists
    //   }

      employee = new Employee({
        empId,
        name,
        designation,
        email,
        phone,
        gender,
      });

      await employee.save();
      insertedEmployees.push(employee);
    }

    res.status(201).json({
      message: 'Employees processed successfully.',
      employees: insertedEmployees,
    });
    
   
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
