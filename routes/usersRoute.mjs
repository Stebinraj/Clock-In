import express from 'express';
const router = express.Router();
import userModel from '../models/users.mjs';
import trackerModel from '../models/tracker.mjs';
import jwt from 'jsonwebtoken';

// Check login credentials
router.post('/api/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) {
            return res.send('User does not exist');
        }
        else if (user.password !== req.body.password) {
            return res.send('Invalid Password');
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '12h' });
            return res.send({ user, token });
        }
    } catch (error) {
        return res.send(error);
    }
});

// add an employee
router.post('/api/register', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            // Check if user already exists
            const existingUser = await userModel.findOne({ username: req.body.username });
            if (existingUser) {
                return res.send('User already exists !!!');
            }
            else {
                // Create new user
                const newUser = new userModel(req.body);

                // Save the user
                await newUser.save();
                return res.send({ newUser, verifyToken });
            }
        }
    } catch (error) {
        return res.send(error);
    }
});

// read users
router.post('/api/users', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            let users = await userModel.find({});
            return res.send(users);
        }
    } catch (error) {
        return res.send(error);
    }
});

// update specific employee credentials
router.put('/api/users/:_id', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const data = await userModel.findByIdAndUpdate({ _id: req.params._id }, req.body);
            return res.send(data);
        }
    } catch (error) {
        return res.send(error);
    }
})

// delete specific employee
router.delete('/api/delete/:_id', async (req, res) => {
    try {
        const userData = await userModel.findByIdAndDelete({ '_id': req.params._id });
        if (!userData) return res.send({ message: 'User not found' });

        const trackerData = await trackerModel.deleteMany({ 'empId': req.params._id });
        return res.send({ userData, trackerData });
    } catch (error) {
        return res.send(error);
    }
});


export default router;