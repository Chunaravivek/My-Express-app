// app/controllers/userController.js
const User = require('../models/User');
const { isImage } = require('../utils/fileUpload');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while fetching user' });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const user = new User({ ...req.body });
        if (req.file) {
            if (!isImage(req.file.mimetype)) {
                return res.status(400).json({ message: 'Only image files are allowed' });
            }
            user.profileImage = req.file.path;
        }

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while creating user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        Object.assign(user, req.body);
        if (req.file) {
            if (!isImage(req.file.mimetype)) {
                return res.status(400).json({ message: 'Only image files are allowed' });
            }
            user.profileImage = req.file.path;
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while updating user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while deleting user' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
