const { Application, ValidateApplication } = require('../models/Application');
const { Account } = require('../models/Account');
var ObjectId = require("mongodb").ObjectId;
const BaseController = require('./BaseController');

class ApplicationController extends BaseController {
    async create(req, res) {
        try {
            const { package_name, account_id } = req.body;
            const existingApplication = await Application.findOne({ package_name });
            if (existingApplication) return res.status(409).json({ message: 'application already exists' });

            const app_code = await super.app_code(6);
            const check_app_code = await Application.findOne({ app_code: app_code });
            if (check_app_code) return res.status(400).json("Already Exists app code!");

            try {
                var account_o_id = new ObjectId(account_id);
            } catch (error) {
                return res.status(400).json({ message: `Account ID is incorrect: ${error.message}` });
            }

            const check_account = await Account.findById({ _id: account_o_id });
            if (!check_account) return res.status(400).json("account not available!");

            const application = new Application(req.body);

            application.status = 1;
            application.app_code = app_code;

            await application.save();
            res.status(201).json({ message: 'application save successfully' });
        } catch (error) {
            res.status(500).json({ message: `Error occurred while save application: ${error.message}` });
        }
    }

    async update(req, res) {
        try {
            const { id, package_name, account_id, app_code } = req.body;

            if (!id) return res.status(400).json("Not found id!");

            try {
                var o_id = new ObjectId(id);
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }

            const get_data = await Application.findOne({ _id: { $ne: o_id }, package_name: package_name });
            if (get_data) return res.status(400).json({ message: 'application already exists' });

            const check_app_code = await Application.findOne({ _id: { $ne: o_id }, app_code: app_code });
            if (check_app_code) return res.status(400).json({ message: 'app code already exists' });

            try {
                var account_o_id = new ObjectId(account_id);
            } catch (error) {
                return res.status(400).json({ message: `Account ID is incorrect: ${error.message}` });
            }

            const check_account = await Account.findById({ _id: account_o_id });
            if (!check_account) return res.status(400).json("account not available!");

            let application = await Application.findByIdAndUpdate(id, req.body, {
                new: true,
            });

            if (!application) return res.status(404).json({ message: 'No Record Found!' });

            res.status(200).json({ message: 'application updated successfully' });
        } catch (error) {
            res.status(500).json({ message: `Error occurred while updating application: ${error.message}` });
        }
    }

    async delete(req, res) {
        try {
            const application = await Application.findById(req.params.id);
            if (!application) return res.status(404).json({ message: 'application not found' });

            await Application.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'application deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: `Error occurred while deleting application: ${error.message}` });
        }
    }

    async getById(req, res) {
        try {
            const application = await Application.findById(req.params.id);
            res.status(200).json(application);
        } catch (error) {
            res.status(500).json({ message: `Error occurred while fetching application: ${error.message}` });
        }
    }

    async ValidateBody(req,res,next) {
        const {error} = ValidateApplication(req.body);
        if(error) return res.status(400).json(error.details[0].message);
        next();
    }
}

module.exports = new ApplicationController();
