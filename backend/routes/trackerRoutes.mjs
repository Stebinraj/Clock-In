import express from 'express';
const router = express.Router();
import trackerModel from '../models/tracker.mjs';
import moment from 'moment';
import jwt from 'jsonwebtoken';

// employee time tracker
router.post('/api/tracker', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const tracker = new trackerModel(req.body);
            const data = await tracker.save();
            return res.send(data);
        }
    } catch (error) {
        return res.send(error);
    }
})

// reading tracker history for specific user
router.post("/api/tracker/:_id", async (req, res) => {
    try {
        const veriftToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (veriftToken) {
            const tracker = await trackerModel.find({ empId: req.params._id });
            return res.send(tracker);
        }
    } catch (error) {
        return res.send(error);
    }
});

// read daily, weekly, monthly, yearly data for specific user
router.post('/api/:_id/:range', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const { _id, range } = req.params;

            const startRange = moment().startOf(range);
            const endRange = moment().endOf(range);

            const data = await trackerModel.find({ empId: _id, startTime: { $gte: startRange, $lte: endRange } });
            let totalMilliseconds = 0;
            data.forEach((item) => {
                const duration = item.endTime.getTime() - item.startTime.getTime();
                totalMilliseconds += duration;
            });
            const totalSeconds = Math.floor(totalMilliseconds / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return res.send({ data, total: formattedDuration });
        }
    } catch (error) {
        return res.send(error);
    }
});

// read tracking history by specified date for specific user.
router.post('/api/:_id/:start/:end', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const { _id, start, end } = req.params;

            const startDate = moment(start).startOf('date');
            const endDate = moment(end).endOf('date');

            const data = await trackerModel.find({ empId: _id, startTime: { $gte: startDate, $lte: endDate } });
            let totalMilliseconds = 0;
            data.forEach((item) => {
                const duration = item.endTime.getTime() - item.startTime.getTime();
                totalMilliseconds += duration;
            });
            const totalSeconds = Math.floor(totalMilliseconds / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return res.send({ data, total: formattedDuration });
        }
    } catch (error) {
        return res.send(error);
    }
});

// update specific employee tracker history
router.put('/api/tracker/:_id', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const data = await trackerModel.findByIdAndUpdate({ _id: req.params._id }, req.body);
            return res.send(data);
        }
    } catch (error) {
        return res.send(error);
    }
});

// delete specific employee tracker history
router.delete('/api/tracker/:_id', async (req, res) => {
    try {
        const deleted = await trackerModel.findByIdAndDelete({ _id: req.params._id });
        return res.send(deleted);
    } catch (error) {
        return res.send(error);
    }
});


export default router;