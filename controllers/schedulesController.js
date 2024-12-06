const Schedule = require('../models/Schedule');

// Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ success: false, message: 'Error fetching schedules.' });
  }
};

exports.getSchedulesByDoctorAndDate = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    console.log('Received Doctor ID:', doctorId);
    console.log('Received Date:', date);

    const schedules = await Schedule.findAll({
      where: {
        doctorId: doctorId,
        date: date,
      },
      attributes: ['id', 'date', 'timeFrame'],
    });

    console.log('Fetched Schedules:', schedules);

    if (schedules.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No schedules found for the specified doctor and date.',
      });
    }

    // Map schedules to plain JSON
    const simplifiedSchedules = schedules.map((schedule) => ({
      id: schedule.id,
      date: schedule.date,
      timeFrame: schedule.timeFrame,
    }));

    res.status(200).json({
      success: true,
      data: simplifiedSchedules,
    });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

exports.getAvailableTimes = async (req, res) => {
  try {
    const { id } = req.params; // Doctor ID
    const { date } = req.query; // Date in YYYY-MM-DD format

    if (!id || !date) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID and date are required.',
      });
    }

    const schedules = await Schedule.findAll({
      where: {
        doctorId: id,
        date: date,
      },
      attributes: ['timeFrame'], // Return only the timeFrame column
    });

    if (!schedules || schedules.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No schedules found for the selected date.',
      });
    }

    const availableTimes = schedules.map((schedule) => ({
      time: schedule.timeFrame,
    }));

    return res.status(200).json({
      success: true,
      times: availableTimes,
    });
  } catch (error) {
    console.error('Error fetching available times:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { doctorId, date, timeFrame } = req.body;

    // Validate required fields
    if (!doctorId || !date || !timeFrame) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create the schedule
    const newSchedule = await Schedule.create({ doctorId, date, timeFrame });
    res.status(201).json({ success: true, data: newSchedule });
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ success: false, message: 'Error creating schedule.' });
  }
};



// Update a schedule
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId, date, timeFrame } = req.body;

    // Ensure the schedule exists
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found.' });
    }

    await Schedule.update({ doctorId, date, timeFrame }, { where: { id } });
    const updatedSchedule = await Schedule.findByPk(id);
    res.status(200).json({ success: true, data: updatedSchedule });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ success: false, message: 'Error updating schedule.' });
  }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the schedule exists
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found.' });
    }

    await Schedule.destroy({ where: { id } });
    res.status(204).json({ success: true, message: 'Schedule deleted successfully.' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ success: false, message: 'Error deleting schedule.' });
  }
};
