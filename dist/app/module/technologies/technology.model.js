"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Technology Schema definition
const TechnologySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Technology name is required'],
        trim: true,
    },
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'Full Stack', 'Tools'], // Enum values from TechnologyCategory
        required: [true, 'Category is required'],
    },
    isFeatured: {
        type: Boolean,
        default: false,
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
// Technology model export
const Technology = (0, mongoose_1.model)('Technology', TechnologySchema);
exports.default = Technology;
