// Import Mongoose package for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema of the project model
const projectSchema = mongoose.Schema({
    projectLabel: {
        type: String,
        required: true
    }
});

// Create a Project model with the defined schema
const projectModel = mongoose.model('Projects', projectSchema);

// Export Project model for use in other modules
export default projectModel;