const express = require('express');
const { createStaff, getStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const router = express.Router();
router.post('/staff', createStaff);
router.get('/staff', getStaff);
router.put('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);
module.exports = router;