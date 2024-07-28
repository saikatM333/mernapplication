const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

// Create employee
router.post('/', auth, employeeController.createEmployee);

// Get all employees
router.get('/', auth, employeeController.getAllEmployees);

// Get employee by ID
router.get('/:id', auth, employeeController.getEmployeeById);

// Update employee
router.put('/:id', auth, employeeController.updateEmployee);

// Delete employee
router.delete('/:id', auth, employeeController.deleteEmployee);

module.exports = router;
