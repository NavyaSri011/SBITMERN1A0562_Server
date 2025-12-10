const Management = require('../models/Management');
const Staff = require('../models/Management');

// Create a management
exports.createManagement = async (req, res) => {
  try {
    const management = new Management(req.body);
    await management.save();
    res.status(201).json(management);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Read all management
exports.getManagement = async (req, res) => {
  try {
    const management = await Management.find();
    res.json(management);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a management
exports.updateManagement = async (req, res) => {
  try {
    const management = await Management.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(management);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a management
exports.deleteManagement = async (req, res) => {
  try {
    await Management.findByIdAndDelete(req.params.id);
    res.json({ message: 'Management deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
