const express = require('express');
const { createManagement, getManagement, updateManagement, deleteManagement } = require('../controllers/managementController');
const router = express.Router();

router.post('/management', createManagement);
router.get('/management', getManagement);
router.put('/management/:id', updateManagement);
router.delete('/management/:id', deleteManagement);

module.exports = router;