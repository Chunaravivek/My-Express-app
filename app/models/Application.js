const mongoose = require('mongoose');
const Joi = require('joi');

const Applicationchema =
    new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        app_version: {
            type: String,
            trim: true,
            maxlength: 255,
            default: "1.0",
        },
        account_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
        package_name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        firebase_id: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        sender_id: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        app_code: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        account_url: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        recmnd_status: {
            type: String,
            enum: ['1', '2'],
            default: "1",
        },
        ternding_status: {
            type: String,
            enum: ['1', '2'],
            default: "2",
        },
        play_store: {
            type: String,
            enum: ['1', '2', '3'],
            default: "1",
        },
        status: {
            type: Boolean,
            default: true,
            index: true
        }
    },
        { timestamps: true });

const Application = mongoose.model('Application', Applicationchema);

function ValidateApplication(application) {
    const schema = Joi.object({
        id: Joi.string(),
        name: Joi.string().min(3).max(255).required(),
        app_version: Joi.string().min(3).max(255).required(),
        package_name: Joi.string().min(3).max(255).required(),
        firebase_id: Joi.string().min(3).max(255).required(),
        sender_id: Joi.string().min(3).max(255).required(),
        account_id: Joi.string().min(3).max(255).required(),
        account_url: Joi.string().min(3).max(255).required(),
    });

    return schema.validate(application);
}

module.exports = { ValidateApplication, Application }