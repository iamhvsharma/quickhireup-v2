import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  workType: {
    type: String,
    enum: ['remote', 'in-office', 'hybrid'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  stipend: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  applyUrl: String,
  postedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship; 