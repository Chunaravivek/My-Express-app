const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, ValidateAdmin, ValidateLogin } = require('../models/Admin');
const { removeFile } = require("../utils/common");
var ObjectId = require("mongodb").ObjectId;

class AdminController {
	async registerAdmin(req, res) {
		try {

			const { username, email, password } = req.body;
			const existingAdmin = await Admin.findOne({ email });
			if (existingAdmin) return res.status(409).json({ message: 'admin already exists' });

			const admin = new Admin(req.body);
			if (req.file) admin.avatar = req.file.filename;

            admin.status = 1;
            await admin.save();
            res.status(201).json({ message: 'admin registered successfully' });
        } catch (error) {
        	res.status(500).json({ message: `Error occurred while registering admin ${error.message}` });
        }
    }

    async loginAdmin(req, res) {
    	try {
    		const { email, password } = req.body;
    		const user = await Admin.findOne({ email });

    		if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    		const isPasswordValid = await bcrypt.compare(password, user.password);
    		if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    		res.cookie('jwt', token, { httpOnly: true, secure: true });
    		res.status(200).json({ token });
    	} catch (error) {
    		res.status(500).json({ message: `Error occurred while logging in ${error.message}` });
    	}
    }

    logoutAdmin(req, res) {
    	res.clearCookie('jwt');
    	res.status(200).json({ message: 'Logged out successfully' });
    }

	async update(req, res) {
		try {
			const { id, email } = req.body;
			if (!id) return res.status(400).json("Not found id!");

            try {
                var o_id = new ObjectId(id);
            } catch (error) {
				console.log(123)
                return res.status(400).json({ message: error.message });
            }

			const existingAdmin = await Admin.findOne({ _id: { $ne: o_id }, email: email });
			if (existingAdmin) return res.status(409).json({ message: 'admin already exists' });

			const document = await Admin.findById(o_id);

			if (req.file) {
				removeFile(`public/uploads/${document.avatar}`);
				document.avatar = req.file.filename;
			}

			Object.assign(document, req.body);
			await document.save();
            res.status(201).json({ message: document });
        } catch (error) {
        	res.status(500).json({ message: `Error occurred while registering admin ${error.message}` });
        }
    }

	async getAll(req, res) {
        try {
			const documents = await Admin.find();
			res.json(documents);
		} catch (error) {
			res.status(500).json({ message: `Error fetching documents: ${error.message}` });
		}
    }

	async getById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ message: `Error occurred while fetching admin: ${error.message}` });
        }
    }

	async delete(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'admin not found' });

            await Admin.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'admin deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: `Error occurred while deleting admin: ${error.message}` });
        }
    }

    async ValidateBody(req,res,next) {
    	const {error} = ValidateAdmin(req.body);
    	if(error) return res.status(400).json(error.details[0].message);
    	next();
    }

    async ValidateLogin(req,res,next){
    	const {error} = ValidateLogin(req.body);
    	if(error) return res.status(400).json(error.details[0].message);
    	next();
    }
}

module.exports = new AdminController();
