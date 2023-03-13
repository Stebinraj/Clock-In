// Import required modules and packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Use dotenv package to load environmental variables from .env file
dotenv.config();

// Import routes from separate files
import userRoutes from './routes/usersRoute.mjs';
import trackerRoutes from './routes/trackerRoutes.mjs';
import projectRoutes from './routes/projectRoutes.mjs';
import taskRoutes from './routes/tasksRoute.mjs';

// Create new Express app
const app = express();

// Use middleware packages to handle requests
app.use(cors()); // Enable cross-origin resource sharing (CORS)
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Enable strict mode for MongoDB queries
mongoose.set('strictQuery', true);

// Connect to MongoDB using environmental variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'build')));

// Set up routes to handle requests
app.use(trackerRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(path.dirname(new URL(import.meta.url).pathname), 'build', 'index.html'));
});

// // Start server listening on environmental variable port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});