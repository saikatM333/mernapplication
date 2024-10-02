const Employee = require('../model/employees');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create Employee
exports.createEmployee = [
  upload.single('image'),
  async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file.path;

    try {
      let employee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
      });

      await employee.save();
      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
];

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update Employee
exports.updateEmployee = [
  upload.single('image'),
  async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    try {
      let employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ msg: 'Employee not found' });
      }

      employee.name = name;
      employee.email = email;
      employee.mobile = mobile;
      employee.designation = designation;
      employee.gender = gender;
      employee.course = course;
      employee.image = image;

      await employee.save();
      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
];

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
