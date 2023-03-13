import express from 'express';
import taskModel from '../models/tasks.mjs';
const router = express.Router();
import jwt from 'jsonwebtoken';

// add a task
router.post('/api/task', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const task = new taskModel(req.body);
            const data = await task.save();
            return res.send(data);
        }
    } catch (error) {
        return res.send(error);
    }
});

// read a task
router.post('/api/tasks', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const task = await taskModel.find({});
            return res.send(task);
        }
    } catch (error) {
        return res.send(error);
    }
});

export default router;