const DoctorClinicSpecialty = require('../models/DoctorClinicSpecialty');

// Get all records
exports.getAll = async (req, res) => {
    try {
        const records = await DoctorClinicSpecialty.findAll();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new record
exports.create = async (req, res) => {
    try {
        const newRecord = await DoctorClinicSpecialty.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a record
exports.update = async (req, res) => {
    try {
        const updatedRecord = await DoctorClinicSpecialty.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a record
exports.delete = async (req, res) => {
    try {
        await DoctorClinicSpecialty.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
