import express from 'express';
import Internship from '../models/internship.model.js';

const router = express.Router();

// Get all internships
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ postedDate: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add more routes as needed (create, update, delete)

export default router; 