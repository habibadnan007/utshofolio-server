"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Education Schema definition
const EducationSchema = new mongoose_1.Schema({
    instituteName: {
        type: String,
        required: [true, 'Institute name is required'],
        trim: true,
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
    },
    timePeriod: {
        type: String,
        required: [true, 'Time period is required'],
    },
    location: {
        type: String, // Optional: location of the institute
    },
    position: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// Education model export
const Education = (0, mongoose_1.model)('Education', EducationSchema);
exports.default = Education;
