const mongoose = require('mongoose');
const Joi = require('joi');

const AccountSchema = new mongoose.Schema(
{
	name: {
		type: String,
		trim: true,
		maxlength: 255,
	},
	platform: {
		type: String,
		enum: ['1', '2'],
		default: "1",
		trim: true,
	},
	url: {
		type: String,
		trim: true,
		maxlength: 255,
	},
	email: {
		type: String,
		trim: true,
		minlength: 3,
		maxlength: 255,
	},
	status: {
		type: Boolean,
		default: true,
		index: true
	}
},
{ timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);

function ValidateAccount(account) {
	const schema = Joi.object({
		id : Joi.string(),
		name: Joi.string().min(3).max(255).required(),
		platform: Joi.any().valid('1','2'),
		url: Joi.string().min(3).max(255).required(),
		email: Joi.string().email().required(),
	});

	return schema.validate(account);
}

module.exports = { Account, ValidateAccount };