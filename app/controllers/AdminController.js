const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, ValidateAdmin, ValidateLogin } = require('../models/Admin');

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
