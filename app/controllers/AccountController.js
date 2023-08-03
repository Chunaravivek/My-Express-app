const { Account, ValidateAccount } = require('../models/Account');
var ObjectId = require("mongodb").ObjectId;

class AccountController {
	async create(req, res) {
		try {

			const { name } = req.body;
			const existingAccount = await Account.findOne({ name });
			if (existingAccount) {
				return res.status(409).json({ message: 'account already exists' });
			}

			const account = new Account(req.body);

			account.status = 1;
			await account.save();
			res.status(201).json({ message: 'account registered successfully' });
		} catch (error) {
			res.status(500).json({ message: 'Error occurred while registering account' });
		}
	}

	async update(req, res) {
		try {
			const { id, name } = req.body;

			if (!id) return res.status(400).json("Not found id!");

			try {
				var o_id = new ObjectId(id);
			} catch (error) {
				return res.status(400).json(error.message);
			}

			const get_data = await Account.findOne({ _id: { $ne: o_id }, name: name });
			if (get_data) return res.status(409).json({ message: 'account already exists' });

			let account = await Account.findByIdAndUpdate(id, req.body, {
				new: true,
			});

			if (!account) return res.status(404).json({ message: 'No Record Found!' });

			res.status(200).json({ message: 'Account updated successfully' });
		} catch (error) {
			res.status(500).json({ message: `Error occurred while updating account: ${error.message}` });
		}
	}

	async delete(req, res) {
		try {
			const account = await Account.findById(req.params.id);
			if (!account) {
				return res.status(404).json({ message: 'Account not found' });
			}

			await account.remove();
			res.status(200).json({ message: 'Account deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: 'Error occurred while deleting account' });
		}
	}

	async getById(req, res) {
        try {
            const account = await Account.findById(req.params.id);
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ message: 'Error occurred while fetching account' });
        }
    }

	async ValidateBody(req,res,next) {
		const {error} = ValidateAccount(req.body);
		if(error) return res.status(400).json(error.details[0].message);
		next();
	}
}

module.exports = new AccountController();
