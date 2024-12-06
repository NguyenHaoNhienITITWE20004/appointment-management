const Clinic = require('../models/Clinic');

// Get all clinics
exports.getAll = async (req, res) => {
    try {
        const clinics = await Clinic.findAll();
        res.status(200).json({ success: true, data: clinics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get featured clinics
exports.getFeatured = async (req, res) => {
    try {
        // Example: Fetch top 5 clinics marked as "featured" (customize query as needed)
        const featuredClinics = await Clinic.findAll({
            limit: 5, // Fetch only the top 5 clinics
            order: [['createdAt', 'DESC']], // Order by latest created
        });

        res.status(200).json({ success: true, data: featuredClinics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
