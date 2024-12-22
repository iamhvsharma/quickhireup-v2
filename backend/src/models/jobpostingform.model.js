import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: function() { return !this.isDraft; }
    },
    description: {
        type: String,
        required: function() { return !this.isDraft; }
    },
    positionType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: function() { return !this.isDraft; }
    },
    location: {
        type: String,
        required: function() { return !this.isDraft; }
    },
    remotePolicy: {
        type: String,
        enum: ['in-office', 'hybrid', 'remote'],
        required: function() { return !this.isDraft; }
    },
    salary: {
        currency: {
            type: String,
            default: 'INR'
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        }
    },
    companyDetails: {
        companyName: String,
        companySize: String,
        industry: String,
        description: String
    },
    requirements: {
        relocation: {
            type: Boolean,
            default: false
        },
        relocationAssistance: {
            type: Boolean,
            default: false
        },
        experience: {
            minimum: Number,
            preferred: Number
        },
        education: {
            degree: {
                type: String,
                enum: ['bachelor', 'master', 'phd', 'none']
            },
            field: String,
            required: Boolean
        },
        skills: {
            required: [String],
            preferred: [String]
        },
        portfolio: {
            required: Boolean,
            description: String
        },
        resume: {
            required: {
                type: Boolean,
                default: true
            },
            format: {
                type: [String],
                default: ['pdf', 'doc', 'docx']
            }
        },
        additionalDocuments: [{
            name: String,
            required: Boolean,
            description: String
        }]
    },
    isDraft: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    applicationQuestions: [{
        type: {
            type: String,
            enum: ['text', 'multiple_choice', 'yes_no'],
            default: 'text'
        },
        question: String,
        required: {
            type: Boolean,
            default: false
        },
        options: [String] // For multiple choice questions
    }]
}, {
    timestamps: true
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;