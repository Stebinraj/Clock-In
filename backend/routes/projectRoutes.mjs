import express from 'express';
const router = express.Router();
import projectModel from '../models/project.mjs';
import jwt from 'jsonwebtoken';


// adding a project
router.post('/api/project', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const projects = new projectModel(req.body);
            const data = await projects.save();
            return res.send(data);
        }
    } catch (error) {
        return res.send(error);
    }
});



// reading projects
router.post('/api/projects', async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            const project = await projectModel.find({});
            return res.send(project);
        }
    } catch (error) {
        return res.send(error);
    }
})

export default router;