import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shortlisted', 'interview', 'matched', 'rejected'],
        default: 'pending'
    },
    jobDetails: {
        title: String,
        description: String,
        company: String,
        location: String,
        positionType: String,
        remotePolicy: String,
        salary: {
            currency: String,
            min: Number,
            max: Number
        }
    },
    companyDetails: {
        companyName: String,
        companySize: String,
        industry: String,
        companyDescription: String,
        requirements: {
            relocation: Boolean,
            relocationAssistance: Boolean
        }
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    statusUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

export default Application; 